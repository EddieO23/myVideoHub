import express from 'express';


import {upload} from '../middleware/multers3Middleware.js'
import {fetchVideos, uploadFile} from '../controllers/aws/awsFileController.js'

const router = express.Router();

router.post('/upload-file', upload, uploadFile)
router.get('/fetch-videos', fetchVideos)


export default router;