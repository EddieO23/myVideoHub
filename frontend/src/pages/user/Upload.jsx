import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import SideBar from '../../components/SideBar';
import { toast } from 'sonner';
import backendApi from '../../api/backendApi';
import { useConfig } from '../../customHooks/useConfigHook.js';

const Upload = () => {
  const fileRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [videoSrc, setVideoSrc] = useState('');
  const [thumbnailSrc, setThumbnailSrc] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [isPrivate, setIsPrivate] = useState('false');
  const [isLoading, setIsLoading] = useState(false);
  const { configWithJwt } = useConfig();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    const thumbnail = thumbnailRef.current?.files?.[0];

    if (!file) {
      toast('Please select a video file');
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title || '');
      formData.append('description', description || '');
      formData.append('video', file);
      formData.append('isPrivate', isPrivate); // Fixed casing
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }
      const { data } = await backendApi.post(
        '/api/v1/aws/upload-file',
        formData,
        {
          ...configWithJwt,
          headers: {
            ...configWithJwt.headers,
            'Content-Type': 'multipart/form-data', // Fixed syntax error
          },
        }
      );

      if (data.success) {
        toast.success('Video uploaded successfully', data.message);
      } else {
        toast.error('Error uploading video', data.message);
      }
    } catch (error) {
      toast.error('Error uploading video');
    } finally {
      setIsLoading(false);
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
              Upload Video
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Upload;
