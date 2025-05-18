import User from '../../model/userSchema.js';
import sendResponse from '../../utils/sendResponse.js';

export const getUserDetails = async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user._id;
      if (!userId) {
        return sendResponse(res, 400, false, 'Please sign in to continue');
      }
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return sendResponse(res, 404, false, 'User not found');
      }
      sendResponse(res, 200, true, 'User details found', { user });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    sendResponse(res, 500, false, 'Internal server error', null);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name) {
      return sendResponse(res, 400, false, 'Name is required.');
    }
    if (req.user) {
      const userId = req.user._id;
      if (!userId) {
        return sendResponse(res, 404, false, 'userId not found.');
      }
      const user = await User.findByIdAndUpdate(userId, { name, email });
      if (!user) {
        return sendResponse(res, 404, false, 'User not found.');
      }
      sendResponse(res, 200, true, 'Successfully updated your details.', {
        name,
        email,
      });  
    }
  } catch (error) {
    console.error('Error in updating user.', error);
    sendResponse(res, 500, false, 'Internal server error');
  }
};
