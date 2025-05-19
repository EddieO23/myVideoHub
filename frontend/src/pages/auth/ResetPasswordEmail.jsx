import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../../components/Layout';
import backendApi from '../../api/backendApi.js'
import { toast } from 'sonner';

const ResetPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const {data} = await backendApi.post('/api/v1/auth/reset-password', {email})
      if(data.success) {
        toast.success(data.message)
        setEmail("")
        navigate('/sign-in')
      } else {
        toast.warning(data.message)
      }
    } catch (error) { 
      toast.error('Something went wrong...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className='p-4'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-6'>
          <h1 className='text-3xl text-center font-semibold text-gray-800 mb-6'>
            Reset Your Password
          </h1>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className=''>
              <label
                htmlFor='email'
                className='block text-sm font-semibold text-gray-300'
              ></label>
              <input
                name='email'
                type='email'
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-indigo-500'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type='submit'
                className={`w-full px-4 bg-green-500 text-white font-bold rounded-md shadow-md transition duration-300 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center justify-center ${loading} ? "bg-opacity-90" : hover:bg-opacity-90 hover:cursor-pointer`}
                disabled={loading}
              >
                Reset Your Password
              </button>
            </div>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Not a member yet?</span>
              <Link to={`/sign-up`}>Sign Up For Free.</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordEmail;
