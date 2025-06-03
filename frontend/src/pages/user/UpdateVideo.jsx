import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import SideBar from '../../components/SideBar';
import { toast } from 'sonner';
import { useConfig } from '../../customHooks/useConfigHook.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEditingVideo,
  updateVideo,
} from '../../reducers/video/videoReducer.js';

const UpdateVideo = () => {
  const editVideo = useSelector(selectEditingVideo);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [videoSrc, setVideoSrc] = useState(editVideo?.path || '');
  const [thumbnailSrc, setThumbnailSrc] = useState(editVideo?.thumbNail || '');
  const [title, setTitle] = useState(editVideo?.title || '');
  const [description, setDescription] = useState(editVideo?.description || '');

  const [isPrivate, setIsPrivate] = useState(
    editVideo?.isPrivate !== undefined ? String(editVideo.isPrivate) : 'false'
  );
  const [isLoading, setIsLoading] = useState(false);
  const { configWithJWT } = useConfig();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file.type.startsWith('image/')) {
      const thumbnailUrl = URL.createObjectURL(file);
      setThumbnailSrc(thumbnailUrl);
    }
  };

  const handlePrivacyChange = (e) => {
    const value = e.target.value;
    setIsPrivate(value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const file = fileRef.current?.files?.[0];
  //   const thumbnail = thumbnailRef.current?.files?.[0];

  //   try {
  //     if (editVideo?._id) {
  //       await dispatch(
  //         updateVideo({
  //           id: editVideo._id,
  //           updateData: {
  //             title: title || editVideo.title,
  //             description: description || editVideo.description,
  //             _id: editVideo._id,
  //             uploadedBy: { email: editVideo.uploadedBy.email },
  //             path: file || editVideo.path,
  //             thumbnail: thumbnail || editVideo.thumbNail,
  //           },
  //           configWithJwt: configWithJWT
  //         })
  //       );
  //     }
  //     setVideoSrc(null)
  //     setThumbnailSrc(null)
  //     setTitle('')
  //     setDescription('')
  //   } catch (error) {
  //     toast.error('Something went wrong')
  //   } finally{
  //     setIsLoading(false)
  //   }
  // };

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true at the beginning

    const file = fileRef.current?.files?.[0];
    const thumbnail = thumbnailRef.current?.files?.[0];
    const formData = new FormData();

    if (file) {
      formData.append("video", file);
    }
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      if (editVideo?._id) {
        // Await the dispatch action to ensure it completes before proceeding
        await dispatch(
          updateVideo({
            id: editVideo._id,
            updateData: {
              title: title || editVideo.title,
              description: description || editVideo.description,
              _id: editVideo._id,
              uploadedBy: { email: editVideo.uploadedBy.email },
              isPrivate: isPrivate || editVideo.isPrivate,
              path: file || editVideo.path,
              thumbnail: thumbnail || editVideo.thumbNail,
            },
            configWithJwt: configWithJWT,
          })
        );
      }

      // Reset the form state (optional)
      setVideoSrc(null);
      setThumbnailSrc(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Set loading to false after the async action completes
    }
  };

  return (
    <div className='flex w-full'>
      <SideBar />
      <main className='flex-1 p-4 mt-7 lg:ml-64 '>
        <section className='flex flex-col items-centner'>
          <form
            className='container flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg'
            onSubmit={handleSubmit}
          >
            {/* video */}

            <label htmlFor='video' className='text-text-one font-semibold'>
              Video
            </label>
            <input
              type='file'
              ref={fileRef}
              onChange={handleFileChange}
              accept='video/*'
              className='w-full p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
            {videoSrc && (
              <div className='mt-4 flex flex-col items-center'>
                <video
                  className='w-32 h-32 object-cover rounded-md shadow-md'
                  src={videoSrc}
                  controls
                ></video>
              </div>
            )}

            {/* thumbanail */}

            <label htmlFor='thumbnail' className='text-text-one font-semibold'>
              Thumbnail(optional)
            </label>
            <input
              type='file'
              ref={thumbnailRef}
              onChange={handleThumbnailChange}
              accept='image/*'
              className='w-full p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
            {thumbnailSrc && (
              <div className='mt-4 flex flex-col items-center'>
                <img
                  className='w-32 h-32 object-cover rounded-md shadow-md'
                  src={thumbnailSrc}
                />
              </div>
            )}

            {/* title */}

            <label htmlFor='title' className='text-text-one font-semibold'>
              Title(optional)
            </label>
            <input
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter title of your video'
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-five'
            />

            <label htmlFor='description'>Description</label>
            <ReactQuill
              value={description}
              theme='snow'
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  ['link', 'image'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['clean'],
                ],
              }}
              className='w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-five'
              placeholder='Enter description of your video'
              onChange={setDescription}
            />

            {/* private/public */}

            <label htmlFor='privacy'>Privacy(optiional)</label>
            <select
              name='privacy'
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-five'
              value={isPrivate}
              onChange={handlePrivacyChange}
            >
              <option value={'false'}>Public</option>
              <option value={'true'}>Private</option>
            </select>

            <button
              type='submit'
              className='bg-bg-four rounded-md p-2 text-white text-lg mt-5 hover:bg-opacity-70 duration-300 capitalize w-full md:w-fit flex items-center justify-center disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <>
                  <svg
                    className='animate-spin mr-2 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z'
                    ></path>
                  </svg>
                  updating...
                </>
              ) : (
                'Update video'
              )}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default UpdateVideo;
