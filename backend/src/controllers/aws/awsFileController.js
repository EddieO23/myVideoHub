import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = async (req, res) => {
  try {
    if (req.files && req.files.video) {
      let { title, description, isPrivate } = req.body;
      let baseName;
      const videoFile = req.files.video[0];
      const thumbNailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;
      if (!title) {
        const extension = path.extname(videoFile.originalname);
        baseName = path.basename(videoFile.originalname, extension);
      }
    }
  } catch (error) {}
};
