import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaTimes, FaUser, FaUpload, FaVideo, FaCog } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { fetchUserDetails, logOutUser } from '../reducers/auth/authReducer';
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchUserDetails())
  }, [])

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-black text-white lg:bg-bg-one lg:text-text-one shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className='p-4 text-2xl font-semibold border-b border-gray-300 hidden md:block'>
          My Video Hub
        </div>
        <nav className='mt-10 md:mt-7'>
          <ul className='space-y-2'>
            <li>
              <NavLink
                onClick={toggleSidebar}
                to={'/'}
                className='flex items-center p-3 hover:bg-bg-two hover:text-gray-900 rounded-md'
              >
                <FaHome size={20} className='mr-3' />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleSidebar}
                to={'/user/dashboard'}
                className='flex items-center p-3 hover:bg-bg-two hover:text-gray-900 rounded-md'
              >
                <FaUser size={20} className='mr-3' />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleSidebar}
                to={'/user/upload-video'}
                className='flex items-center p-3 hover:bg-bg-two hover:text-gray-900 rounded-md'
              >
                <FaUpload size={20} className='mr-3' />
                <span>Upload Video</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleSidebar}
                to={'/user/edit/my-videos'}
                className='flex items-center p-3 hover:bg-bg-two hover:text-gray-900 rounded-md'
              >
                <FaVideo size={20} className='mr-3' />
                <span>My Videos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleSidebar}
                to={'/user/profile'}
                className='flex items-center p-3 hover:bg-bg-two hover:text-gray-900 rounded-md'
              >
                <FaCog size={20} className='mr-3' />
                <span>User Profile</span>
              </NavLink>
            </li>
            <li>
              <div onClick={() => dispatch(logOutUser(navigate))} className='flex items-center p-3 hover:bg-bg-two hover:text-gray-900 rounded-md cursor-pointer'>
                <IoIosLogOut size={20} className='mr-3' />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {/* top navbar */}
      <div className='fixed top-0 left-0 right-0 bg-black lg:hidden text-white h-12 items-center px-4 shadow-md z-50 '>
        
        <button onClick={toggleSidebar} className='lg:hidden text-white text-2xl'>
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        <div className="w-full flex items-center justify-center">
          <NavLink to={'/'} className={'text-lg font-semibold'}>My Video Hub</NavLink>
        </div>

      </div>
    </>
  );
};

export default SideBar;
