import crypto from 'crypto';

import User from '../../model/userSchema.js';
import sendResponse from '../../utils/sendResponse.js';
import { hashPassword } from '../../utils/passwordHelper.js';

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
    const newUser = await User.create({
      email,
      password: hashedPassword,
      token: crypto.randomBytes(16).toString('hex'),
    });
    // Send repsonse of successfull
    return sendResponse(res, 200, true, 'User created successfully.');
    //   console.log('Request body:', req.body); // Debugging
    // res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(`Error in signing up the user ${error}`);
    // Send failure response
    return sendResponse(res, 500, false, 'Internal server error');
  }
};
