import express from 'express'
import { getUserDetails, updateUser } from '../controllers/user/userController.js'

const router = express.Router()

router.get('/profile', getUserDetails)
router.post('/update', updateUser)


export default router