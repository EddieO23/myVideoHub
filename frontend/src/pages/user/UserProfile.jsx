import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, updateUser } from '../../reducers/auth/authReducer.js';
import { toast } from 'sonner';
import backendApi from '../../api/backendApi.js';
import { useConfig } from '../../customHooks/useConfigHook.js';

const UserProfile = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [edit, setEdit] = useState(false);
  const {configWithJwt} = useConfig()

  const dispatch = useDispatch()
  
  useEffect(() => {
    if (loggedInUser?.name) {
      setName(loggedInUser.name);
    }
    if (loggedInUser?.email) {
      setEmail(loggedInUser.email);
    }
  }, [loggedInUser]);

  const handleEditClick = () => {
    setEdit((prev) => !prev);
  };

  const handleSaveClick = async () => {
    try {
      const {data} = await backendApi.post('/api/v1/user/update', {name, email}, configWithJwt )
      if(data.success) {
        toast.success(data.message)
        dispatch(updateUser({email, name}))
        setEdit(false)
      } else {
        toast.warning(data.message)
      }
    } catch (error) {
      toast.error('Internal server error');
    }
  };

  return (
    <div className='flex w-full pr-2 h-screen'>
      <SideBar />
      <main className='flex-1 ml-4 lg:ml-[17rem] pr-2 z-10'>
        <section className='p-4 bg-white shadow-lg rounded-lg w-full border border-gray-500 mt-7'>
          <h1 className='text-center font-semibold text-xl text-gray-700 mb-5'>
            Personal Details
          </h1>
          <div className='container flex flex-col gap-4'>
            <div className='flex items-center'>
              <div className='flex flex-col w-full'>
                <label htmlFor='name' className='font-medium text-gray-600'>
                  Name
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Enter your Name'
                    value={name}
                    disabled={!edit}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full p-3 focus:outline-none border rounded-md ${
                      edit ? 'border-blue-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 bg-gray-300`}
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='flex flex-col w-full'>
                <label htmlFor='email' className='font-medium text-gray-600'>
                  Email
                </label>
                <div className='relative'>
                  <input
                    type='email'
                    name='email'
                    placeholder='Enter your Email'
                    value={email}
                    disabled={!edit}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 focus:outline-none border rounded-md ${
                      edit ? 'border-blue-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 bg-gray-300`}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-end'>
              <button
                onClick={() => (edit ? handleSaveClick() : handleEditClick())}
                type='button'
                className='bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-600'
              >
                {edit ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
