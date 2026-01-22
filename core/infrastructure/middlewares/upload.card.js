import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { STORAGE_PATHS } from '../../config/paths.js';

fs.mkdirSync(STORAGE_PATHS.memberCard, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, STORAGE_PATHS.memberCard);
  },
  filename(req, file, cb) {
    if (req.body.data && !req.data) {
      req.data = JSON.parse(req.body.data);
    }

    const ext = path.extname(file.originalname);
    const filename = `${req.data.nik}${ext}`;
    req.uploadedFilename = filename;

    cb(null, filename);
  }
});

const upload = multer({ storage });

export const uploadCard = upload.single('image'); // ⬅️ HARUS LANGSUNG
