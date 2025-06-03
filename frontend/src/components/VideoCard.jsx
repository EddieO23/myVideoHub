import { useState } from 'react';
import {
  FaLock,
  FaTrash,
  FaUnlock,
  FaDownload,
  FaPlay,
  FaEdit,
  FaUserCheck,
  FaExternalLinkAlt,
  FaShareAlt
} from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';


import { downloadVideo, deleteVideo, setEditVideo } from '../reducers/video/videoReducer.js';
import { useConfig } from '../customHooks/useConfigHook';
import parse from "html-react-parser";


const VideoCard = ({ video }) => {
  const { _id, title, description, isPrivate, path, thumbNail, uploadedBy } =
    video;
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { configWithJWT } = useConfig();

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      await dispatch(downloadVideo({ id: _id })).unwrap();
    } catch (error) {
      toast.error('Failed to download video');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    const videoLink = `https://my-video-hub.vercel.app/video/${_id}`;
    navigator.clipboard.writeText(videoLink).then(() => {
      toast.success(`Link copied to clipboard`);
    });
  };

  const handlePlayPause = (isPlaying) => {
    setIsPlaying(isPlaying);
    if (!isPlaying) {
      setIsHovered(true);
    }
  };

  //delete video
  const handleDelete = async () => {
    try {
      await dispatch(deleteVideo({ id: _id, configWithJWT }));
      toast.success('Video deleted!')
    } catch (error) {
      toast.error(`Failed to delete `);
    }
  };

  // handle edit
  const handleEditClick = () => {
    dispatch(setEditVideo(video));
    navigate('/user/edit/my-video');
  };

  return (
    <div className='border border-gray-300 rounded-lg shadow-sm  bg-white relative hover:shadow-md transition-shadow duration-300 ease-in-out m-2 w-full h-auto flex flex-col sm:flex-row gap-4'>
      <div className='leftContainer w-full sm:w-1/3 relative'>
        {/* Privacy Icon */}
        <div className='absolute z-10 top-2 left-2 hidden'>
          {isPrivate ? (
            <FaLock size={16} className='text-red-500' />
          ) : (
            <FaUnlock size={16} className='text-green-500' />
          )}
        </div>

        {/* Video Player */}
        <div
          className=' overflow-hidden relative'
          style={{ width: '100%', height: '180px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ReactPlayer
            url={path}
            light={thumbNail}
            width={'100%'}
            height={'100%'}
            controls={isPlaying}
            playing={isPlaying}
            onPause={() => handlePlayPause(false)}
            onPlay={() => handlePlayPause(true)}
          />
          {!isPlaying && isHovered && (
            <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center transition-opacity duration-300'>
              <FaPlay
                size={30}
                className='text-white cursor-pointer hover:text-gray-300 transition duration-200'
                onClick={() => handlePlayPause(true)}
              />
              {loading ? (
                <p className='text-white cursor-pointer absolute bottom-2 left-2 hover:text-gray-300 transition duration-200'>
                  Downloading ....
                </p>
              ) : (
                <FaDownload
                  size={24}
                  className='text-white cursor-pointer absolute bottom-2 left-2 hover:text-gray-300 transition duration-200'
                  onClick={handleDownload}
                />
              )}
              <Link to={`/video/${_id}`}>
                <FaExternalLinkAlt
                  size={24}
                  className='text-white cursor-pointer absolute top-2 right-2 hover:text-gray-300 transition duration-200'
                />
              </Link>
              {/* Share Icon */}
              <div
                className='absolute z-10 top-2 left-2 cursor-pointer'
                onClick={handleShare}
              >
                <FaShareAlt
                  size={24}
                  className='text-blue-500 hover:text-blue-700 transition-colors duration-200'
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='rightContainer flex flex-col justify-between w-full sm:w-2/3 p-2'>
        {/* Video Details */}
        <div className='flex flex-col mb-2 '>
          <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
          {description && (
            <p className='text-gray-600 text-xs mb-1'>
              {parse(description.substring(0, 100))}
            </p>
          )}

          <div className='flex items-center text-gray-500 text-xs'>
            <FaUserCheck className='mr-1' />
            <span>{uploadedBy.email}</span>
          </div>
        </div>
        {/* Actions */}
        <div className='flex flex-col p-2 sm:flex-row gap-2 flex-wrap'>
          {
            <>
              <Link
                to={`/video/${_id}`}
                className='border text-center border-blue-500 text-blue-500 rounded-md p-2 text-sm hover:bg-blue-500 hover:text-white transition duration-200'
              >
                <FaExternalLinkAlt className='inline-block mr-1' /> Preview
              </Link>
              <button
                type='button'
                className='bg-red-500 text-white rounded-md p-2 text-sm hover:bg-red-600 transition duration-200'
                onClick={handleDelete}
              >
                <FaTrash className='inline-block mr-1' /> Delete
              </button>
              <button
                type='button'
                className='bg-green-500 text-white rounded-md p-2 text-sm hover:bg-opacity-90 transition duration-200'
                onClick={handleEditClick}
              >
                <FaEdit className='inline-block mr-1' /> Edit
              </button>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
