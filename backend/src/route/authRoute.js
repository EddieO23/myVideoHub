import express from 'express'
import { signUpUser } from '../controllers/auth/authController.js'

const router = express.Router()


router.post('/sign-up', signUpUser)
export default router