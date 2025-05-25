import express from 'express';


import {upload} from '../middleware/multers3Middleware.js'
import {fetchSingleVideo, fetchVideos, uploadFile} from '../controllers/aws/awsFileController.js'

const router = express.Router();

router.post('/upload-file', upload, uploadFile)
router.get('/fetch-videos', fetchVideos)
router.get('/fetch-single/video/:id', fetchSingleVideo)
 

export default router; 