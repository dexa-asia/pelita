import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { STORAGE_PATHS } from '../../config/paths.js';

export const convertToJpg = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const inputPath = req.file.path;

    const finalFilename = `${req.data.nik}.jpg`;
    const finalPath = path.join(STORAGE_PATHS.memberCard, finalFilename);

    const tempPath = finalPath + '.tmp';

    const ext = path.extname(req.file.originalname).toLowerCase();
    const mime = req.file.mimetype;

    const isJpg =
      mime === 'image/jpeg' ||
      mime === 'image/jpg' ||
      ext === '.jpg' ||
      ext === '.jpeg';

    const metadata = await sharp(inputPath).metadata();
    const needsResize =
      metadata.width > 1024 || metadata.height > 1024;

    // CASE 1: JPG & tidak perlu resize
    if (isJpg && !needsResize) {
      if (inputPath !== finalPath) {
        fs.renameSync(inputPath, finalPath);
      }
      req.uploadedFilename = finalFilename;
      return next();
    }

    // CASE 2: JPG besar atau non-JPG → proses ke TEMP FILE
    await sharp(inputPath)
      .rotate()
      .resize(1024, 1024, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(tempPath);

    // replace final file
    fs.renameSync(tempPath, finalPath);

    if (inputPath !== finalPath) {
      fs.unlinkSync(inputPath);
    }

    req.uploadedFilename = finalFilename;
    next();
  } catch (err) {
    next(err);
  }
};
