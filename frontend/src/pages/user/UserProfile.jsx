import React, { useState } from 'react'
import SideBar from '../../components/SideBar'

const UserProfile = () => {
  const  [name, setName] = useState('')
  return (
    <div className='flex w-full pr-2 h-screen'>
      <SideBar/>
      <main className='flex-1 ml-4 lg:ml-[17rem] pr-2 z-10'>
      <section className='p-4 bg-white shadow-lg rounded-lg w-full border border-gray-500 mt-7'>
        <h1 className='text-center font-semibold text-xl text-gray-700 mb-5'>Personal Details</h1>
        <div className="container flex flex-col gap-4">
          <div className="flex items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className='font-medium text-gray-600'>Name</label>
              <div className="relative">
                <input type="text" name='name' placeholder='Enter your Name' value />
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}

export default UserProfile
