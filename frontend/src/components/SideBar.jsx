import React, { use, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-black text-white lg:bg-bg-one lg:text-text-one shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? `trasnlate-x-0` : `-translate-x-full`
        }`}
      >
        <div className='p-4 text-2xl font-semibold border-b border-gray-300 hidden md:block'>
          My Video Hub
        </div>
        <nav className='mt-10 md:mt-7'>
          <ul className='space-y-2'>
            <li>
              <NavLink
              onclick={toggleSidebar}
                to={'/'}
                className='flex items-center p-3 text-gray-900  hover:bg-gray-200 hover:text-gray-300 rounded-md'
              >
                <FaHome size={20} className='mr-3' />
                <span>Home</span>
              </NavLink>
            </li>
           <li>
              <NavLink
              onclick={toggleSidebar}
                to={'/myvideos'}
                className='flex items-center p-3 text-gray-900  hover:bg-gray-200 hover:text-gray-300 rounded-md'
              >
                <FaHome size={20} className='mr-3' />
                <span>My Videos</span>
              </NavLink>
            </li>
            <li>
              <NavLink
              onclick={toggleSidebar}
                to={'/userprofile'}
                className='flex items-center p-3 text-gray-900  hover:bg-gray-200 hover:text-gray-300 rounded-md'
              >
                <FaHome size={20} className='mr-3' />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
              onclick={toggleSidebar}
                to={'/logouy'}
                className='flex items-center p-3 text-gray-900  hover:bg-gray-200 hover:text-gray-300 rounded-md'
              >
                <FaHome size={20} className='mr-3' />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideBar;
