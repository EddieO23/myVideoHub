import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import path from 'path';

import User from '../../model/userSchema.js';
import Video from '../../model/videoSchema.js';
import sendResponse from '../../utils/sendResponse.js';
import { Readable } from 'stream';
import { log } from 'console';
import { send } from 'process';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

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
      description: description ? description : undefined,
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

// Read file


export const fetchVideos = async (req, res) => {
  try {
    const videos = await Video.find({ isPrivate: false })
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'email');
    
    // Ensure the response matches the structure expected by the frontend
    return sendResponse(res, 200, true, 'Videos fetched successfully', {
      success: true,
      videos: videos // Make sure this matches the key in your frontend
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};


// fetch single video

export const fetchSingleVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, 'Video ID is required');
    }

    const video = await Video.findById(id).populate('uploadedBy', 'email');

    if (!video) {
      return sendResponse(res, 404, false, 'Video not found');
    }

    sendResponse(res, 200, true, 'Found your video', { video });
  } catch (error) {
    console.error('Error fetching video:', error);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

// delete video

export const deleteGivenVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, 'Video ID not found');
    }

    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return sendResponse(res, 404, false, 'Video not found');
    }

    sendResponse(res, 200, true, 'Video deleted successfully');
  } catch (error) {
    console.error('Error deleting video:', error);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

// download video

export const downloadVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!id) {
      return sendResponse(res, 400, false, 'Video ID not found');
    }

    const video = await Video.findById(id);

    if (!video) {
      return sendResponse(res, 404, false, 'Video not found');
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: video.key,
    };

    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.downloadCount += 1;
        await user.save();
      }
    }

    const command = new GetObjectCommand(params);

    const s3Response = await s3.send(command);

    const stream = s3Response.Body;
    res.setHeader('Content-Disposition', `attachment; filename=${video.title}`);

    res.setHeader('Content-Type', s3Response.ContentType || 'video/mp4');

    stream.pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

// Update video details

export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, 'Video ID not found');
    }

    const video = await Video.findById(id);

    if (!video) {
      return sendResponse(res, 404, false, 'Video not found');
    }
    console.log(req.body);
    
    // Update video details
    Object.assign(video, req.body);

    await video.save();

    // check if a new video file is uploaded

    if (req.files && req.files.video) {
      const videoFile = req.files.video[0];
      if ('location' in videoFile && 'key' in videoFile) {
        video.path = videoFile.location;
        video.key = videoFile.key;
      }
    }

    // updating the thumbnail if present
    if (req.files && req.files.thumbnail) {
      const thumbNailFile = req.files.thumbnail[0];
      if ('location' in thumbNailFile && 'key' in thumbNailFile) {
        video.thumbNail = thumbNailFile.location;
      }
    }
    await video.save();
    sendResponse(res, 200, true, 'Video updated successfully', { video });
  } catch (error) {
    console.error('Error updating video:', error);
    return sendResponse(res, 500, false, 'Internal server error');
  }
};

// Fetch file for given logged in user

export const fetchVideosForLoggedInUser = async (req, res) => {
try {
  
  if (req.user) {
      const userId = req.user._id;
      if (!userId) {
        return sendResponse(res, 400, false, 'userId not found');
      }
    const videos = await Video.find({uploadedBy: userId}).populate('uploadedBy', 'email')
    return sendResponse(res, 200, true, 'Found your videos', {videos})
  }

} catch (error) {
  console.error('Error in fetching videos for loggedin eser', error);
  return sendResponse(res, 500, false, 'Internal Server Error')
}
}


