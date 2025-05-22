import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import SideBar from '../../components/SideBar';

const Upload = () => {
  return (
    <div className='flex w-full'>
      <SideBar />
      <main className='flex-1 p-4 mt-7 lg:ml-64 '>
        <section className='flex flex-col items-centner'>
          <form
            className='container flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg'
            action=''
          >
            {/* video */}

            <label htmlFor='video' className='text-text-one font-semibold'>
              Video
            </label>
            <input
              type='file'
              accept='video/*'
              className='w-full p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
            {
              <div className='mt-4 flex flex-col items-center'>
                <video
                  className='w-32 h-32 object-cover rounded-md shadow-md'
                  src={''}
                  controls
                ></video>
              </div>
            }

            {/* thumbanail */}

            <label htmlFor='thumbnail' className='text-text-one font-semibold'>
              Thumbnail(optional)
            </label>
            <input
              type='file'
              accept='image/*'
              className='w-full p-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600'
            />
            {
              <div className='mt-4 flex flex-col items-center'>
                <img
                  className='w-32 h-32 object-cover rounded-md shadow-md'
                  src={''}
                />
              </div>
            }

            {/* title */}

            <label htmlFor='title' className='text-text-one font-semibold'>
              Title(optional)
            </label>
            <input
              type='text'
              name='title'
              placeholder='Enter title of your video'
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-five'
            />

            <label htmlFor='description'>Description</label>
            <ReactQuill
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
            />

            {/* private/public */}

            <label htmlFor='privacy'>Privacy(optiional)</label>
            <select
              name='privacy'
              className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-five'
            >
              <option value={'false'}>Public</option>
              <option value={'true'}>Private</option>
            </select>

            <button type='submit' className='bg-bg-four rounded-md p-2 text-white text-lg mt-5 hover:bg-opacity-70 duration-300 capitalize w-full md:w-fit flex items-center justify-center disabled:cursor-not-allowed'>
              Upload Video
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Upload;
