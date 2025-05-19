import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import User from '../model/userSchema.js';
import { transporter } from "../config/nodemailer.js";

dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const resetPasswordEmail = async (user) => {
  try {
    // Use __dirname to construct the path to the email template
    const emailHtml = await ejs.renderFile(path.join(__dirname, "../view/resetEmail.ejs"), { token: user.token });
    
    const options = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Your Password",
      html: emailHtml,
    };

    await transporter.sendMail(options);
  } catch (error) {
    console.error('Error in sending reset password mail', error);
  }
};
