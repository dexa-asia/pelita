import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { STORAGE_PATHS } from '../../config/paths.js';

export const convertToJpg = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const inputPath = req.file.path;
    const outputFilename = `${req.data.nik}.jpg`;
    const outputPath = path.join(STORAGE_PATHS.memberCard, outputFilename);

    await sharp(inputPath)
      .resize(1024, 1024, {
            fit: 'inside',
            withoutEnlargement: true
        })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(outputPath);

    fs.unlinkSync(inputPath); // hapus file asli

    req.uploadedFilename = outputFilename;

    next();
  } catch (err) {
    next(err);
  }
};
