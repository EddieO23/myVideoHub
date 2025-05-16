import express from 'express'
import { getUserDetails } from '../controllers/user/userController.js'

const router = express.Router()

router.get('/profile', getUserDetails)



export default router