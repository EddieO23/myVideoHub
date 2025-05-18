import dotenv from 'dotenv'


import user from '../model/userSchema.js'
import { transporter } from "../config/nodemailer.js";

dotenv.config()

export const resetPasswordEmail = async (user) => {
  try {
    const options = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Your Password",
      html: "<h1>Reset Password eMail</h1>",
    }
    await transporter.sendMail(options)
  } catch (error) {
    console.error('Error in sending reset password mail', error);
    
  }
}