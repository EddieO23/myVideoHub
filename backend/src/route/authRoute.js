import express from 'express'
import { sendEmailForResetPassword, signInUser, signUpUser } from '../controllers/auth/authController.js'

const router = express.Router()


router.post('/sign-up', signUpUser)
router.post('/sign-in', signInUser)
router.post('/reset-password', sendEmailForResetPassword)

export default router