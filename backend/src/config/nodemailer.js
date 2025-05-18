import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.log('Error in transporter connection:', error)
  } else {
    console.log('Server is ready to send email')
  }
})