import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';

import User from '../../model/userSchema.js';
import Video from '../../model/videoSchema.js';
import sendResponse from '../../utils/sendResponse.js';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

//orignal code

// export const uploadFile = async (req, res) => {
//   try {
//     if (req.files && req.files.video) {
//       let { title, description, isPrivate } = req.body;
//       let baseName;
//       const videoFile = req.files.video[0];
//       const thumbNailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;
//       if (!title) {
//         const extension = path.extname(videoFile.originalname);
//         baseName = path.basename(videoFile.originalname, extension);
//       }
//     }
//     if(req.user) {
//       if('location' in videoFile){
//         if('key' in videoFile) {
//           const newVideo = new Video({
//             title: title || baseName,
//             description: description ? description : null,
//             uploadedBy: req.user._id,
//             path: videoFile.location,
//             key: videoFile.key,
//             isPrivate: isPrivate ? isPrivate : false,
//             thumbNail: thumbNailFile ? thumbNailFile.location : 'https://placehold.co/600x400',
//           });
//           const user = await user.findById(req.user._id); // Fix: use lowercase 'user' as imported
//           if (user) {
//             user.uploadCount += 1;
//             await user.save();
//           }
//           return sendResponse(res, 200, true, 'Video uploaded successfully', {
//             success: true,
//             message: 'Video uploaded successfully',
//             video: {
//               _id: newVideo._id,
//               path: newVideo.path,
//               title: newVideo.title,
//               description: newVideo.description,
//               uploadedBy: {
//                 email: req.user?.email,
//               },
//               isPrivate: newVideo.isPrivate,
//             },
//           });
//         }
//         return sendResponse(res, 400, false, 'Video upload failed');
//       }
//       return sendResponse(res, 400, false, 'Not authorized to upload video');
//     }
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return sendResponse(res, 500, false, 'Internal server error', {
//       success: false,
//       message: 'Internal server error',
//     });

//   }
// };


export const uploadFile = async (req, res) => {
  try {
    let { title, description, isPrivate } = req.body;
    let baseName;

    // Check if files exist
    if (!req.files || !req.files.video || req.files.video.length === 0) {
      return sendResponse(res, 400, false, 'No video file uploaded');
    }

    const videoFile = req.files.video[0];
    const thumbNailFile = req.files.thumbnail ? req.files.thumbnail[0] : null;

    // Generate base name if no title provided
    if (!title) {
      const extension = path.extname(videoFile.originalname);
      baseName = path.basename(videoFile.originalname, extension);
    }

    // Check if user is authenticated
    if (!req.user) {
      return sendResponse(res, 401, false, 'Not authorized to upload video');
    }

    // Verify video file upload details
    if (!videoFile.location || !videoFile.key) {
      return sendResponse(res, 400, false, 'Video upload failed');
    }

    // Create new video document
    const newVideo = new Video({
      title: title || baseName,
      description: description ? description :  undefined,
      uploadedBy: req.user._id,
      path: videoFile.location,
      key: videoFile.key,
      isPrivate: isPrivate || false,
      // Explicitly set default thumbnail if no thumbnail uploaded
      thumbNail: thumbNailFile
        ? thumbNailFile.location
        : 'https://placehold.co/600x400',
    });

    // // Debugging log for newVideo
    // console.log('New Video Object:', {
    //   title: newVideo.title,
    //   thumbNail: newVideo.thumbNail,
    // });

    const currentUser = await User.findById(req.user._id);

    if (currentUser) {
      currentUser.uploadCount += 1;
      await currentUser.save();
    }

    // Save the video
    await newVideo.save();

    return sendResponse(res, 200, true, 'Video uploaded successfully', {
      success: true,
      message: 'Video uploaded successfully',
      video: {
        _id: newVideo._id,
        path: newVideo.path,
        title: newVideo.title,
        description: newVideo.description,
        uploadedBy: {
          email: req.user?.email,
        },
        isPrivate: newVideo.isPrivate,
        thumbNail: newVideo.thumbNail, // Explicitly include thumbnail in response
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return sendResponse(res, 500, false, 'Internal server error', {
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};
