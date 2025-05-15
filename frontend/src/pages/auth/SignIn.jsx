import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
 

import Layout from '../../components/Layout';
import { signInUser } from '../../reducers/auth/authReducer';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    dispatch(signInUser({email, password}));
  }

  return (
    <Layout>
      <div className='flex items-center justify-center p-4 w-full'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-6'>
          <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
            Join us Today
          </h1>
          <form className='space-y-7' onSubmit={handleSubmit} >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                required
                className='w-full mt-1 block py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                required
                className='w-full mt-1 block py-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
                placeholder='Enter your password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type='submit'
              className={`w-full py-3 px-4 bg-green-500 text-white font-bold rounded-md shadow-md transition duration-300 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center`}
            >
              Sign Up
            </button>
          </form>
          <Link to={'/sign-up'} className='text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-300'>Sign Up for FREE</Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
