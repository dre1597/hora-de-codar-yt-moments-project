import { diskStorage } from 'multer';
import path = require('path');
import crypto = require('crypto');

export const storage = {
  storage: diskStorage({
    destination: './uploads/moments-images',
    filename: (_req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') +
        crypto.randomUUID();
      const fileExtension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${fileExtension}`);
    },
  }),
};
