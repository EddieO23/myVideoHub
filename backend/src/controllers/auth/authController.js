import crypto from 'crypto';

import User from '../../model/userSchema.js';
import sendResponse from '../../utils/sendResponse.js';
import { comparePassword, hashPassword } from '../../utils/passwordHelper.js';
import { generateJwtToken } from '../../utils/generateJwtToken.js';
import { resetPasswordEmail } from '../../mailer/resetPassword.js';

export const signUpUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      //do nothing
      return sendResponse(res, 400, false, 'User already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    await User.create({
      email,
      password: hashedPassword,
      token: crypto.randomBytes(16).toString('hex'),
    });
    // Send repsonse of successful
    return sendResponse(res, 200, true, 'User created successfully.');
    console.log('Request body:', req.body); // Debugging
    // res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(`Error in signing up the user ${error}`);
    // Send failure response
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, false, 'User does not exist');
    }
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return sendResponse(res, 400, false, 'Passwords do not match');
    }
    const jwtToken = await generateJwtToken(user);
    sendResponse(res, 200, true, 'Logged in successfully', {
      user: { token: jwtToken },
    });
  } catch (error) {
    console.error(`Error in signing in the user ${error}`);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

export const sendEmailForResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return sendResponse(res, 404, false, 'Email not found.');
    }
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found.');
    }
    await resetPasswordEmail(user);
    sendResponse(res, 200, true, 'Check your email to reset your password.');
  } catch (error) {
    console.error(`Error in signing in the user ${error}`);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token) {
      return sendResponse(res, 404, false, 'Token not found.');
    }
    const user = await User.findOne({ token });
    if (!user) {
      return sendResponse(res, 404, false, 'User not found.');
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    (user.token = crypto.randomBytes(16).toString('hex')),
    await user.save();
    return sendResponse(res, 200, true, 'Updated your password.');
  } catch (error) {
    return sendResponse(res, 500, false, 'Internal server error');
  }
};
