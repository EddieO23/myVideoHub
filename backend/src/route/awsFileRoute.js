import express from 'express';


import {upload} from '../middleware/multers3Middleware.js'
import {uploadFile} from '../controller/aws/awsFileController.js'

const router = express.Router();

router.post('/upload-file', upload, uploadFile)


export default router;