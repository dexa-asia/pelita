// core/config/paths.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * __dirname = terracoop/core/config
 * naik 2 level → terracoop (project root)
 */
export const PROJECT_ROOT = path.resolve(__dirname, '../../');

export const STORAGE_ROOT = path.join(PROJECT_ROOT, 'storage');

export const STORAGE_PATHS = {
  userAvatar: path.join(STORAGE_ROOT, 'images', 'users'),
  memberCard: path.join(STORAGE_ROOT, 'images', 'cards'),
  memberSignature: path.join(STORAGE_ROOT, 'images','signatures'),
};
