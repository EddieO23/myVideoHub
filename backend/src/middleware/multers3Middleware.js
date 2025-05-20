import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'private',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const folder = 'my-video-hub';
      const extension = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, extension);
      const fileName = `${baseName}-${Date.now()}-${
        file.fieldname
      }${extension}`;
      const filePath = `${folder}/${fileName}`;
      cb(null, filePath);
    },
  }),
}).fields([
  {name: 'video', maxCount: 1},
  {name: 'thumbnail', maxCount: 1},
])
