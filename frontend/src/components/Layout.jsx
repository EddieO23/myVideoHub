import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { BsTwitch } from "react-icons/bs";
import { SiReddit } from "react-icons/si";
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-bg-two flex flex-col'>
      <nav className='flex items-center bg-bg-five p-4 justify-end md:text-lg border-black border-b-[1px] fixed top-0 z-50 w-full text-white'>
        <div className='flex items-center gap-3 md:gap-5 lg:gap-7 capitalize'>
          <Link to={'/'}>Home</Link>
          <Link to={'/all-videos'}>All Videos</Link>
          <Link to={'/sign-in'}>Sign In</Link>
        </div>
      </nav>
      <header></header>
      <main className='flex-1 flex flex-col items-center w-full mt-16'>
        {children}
      </main>
      <footer className='bg-black text-center  py-6 border-t-[1px] border-t-black z-50 '>
        <div className='flex justify-center gap-6 mb-4 text-white'>
          <a href='https://github.com/EddieO23?tab=repositories'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub'
          >
            <AiFillGithub size={24} />
          </a>
          <a href='https://www.twitch.tv/reznovops143'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='twitch'
          >
            <BsTwitch size={24} />
          </a>
          <a href='https://www.reddit.com/user/ReznovOps143/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='reddit'
          >
            <SiReddit size={24} />
          </a>
        </div>
        <p className='text-white text-sm'>
         Sharing the joy of videos with the world, one stream at a time.
        </p>
        <p className='text-white text-sm'>
          &copy; {new Date().getFullYear()} <strong>soberDevEddie</strong>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
