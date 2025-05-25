import express from 'express';

import { upload } from '../middleware/multers3Middleware.js';
import {
  deleteGivenVideo,
  fetchSingleVideo,
  fetchVideos,
  uploadFile,
} from '../controllers/aws/awsFileController.js';

const router = express.Router();

router.post('/upload-file', upload, uploadFile);
router.get('/fetch-videos', fetchVideos);
router.get('/fetch-single/video/:id', fetchSingleVideo);
router.delete('/delete-single/video/:id', deleteGivenVideo);

export default router;
