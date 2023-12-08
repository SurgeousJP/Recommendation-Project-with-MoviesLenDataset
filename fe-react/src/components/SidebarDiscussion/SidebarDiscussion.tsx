import React from 'react';
import { Link } from 'react-router-dom';
import useUserId from 'src/hooks/useUserId';

interface SidebarDiscussionProps {
  previousPageUrl?: string;
  previousPageTitle?: string;
  className?: string;
}

function SidebarDiscussion({
  previousPageUrl = '/',
  previousPageTitle = 'Back to TMDB',
  className = 'w-60 min-h-screen bg-[#02121E] flex flex-col items-end'
}: SidebarDiscussionProps) {
  const { userId, hasLogin } = useUserId();

  return (
    <div className={className}>
      <img src='/src/assets/images/sidebarIcon.svg' alt='logo' className='w-1/2 h-20 mt-10 mr-10' />
      <Link to={previousPageUrl} className=' mt-10  mr-10 hover:text-white/60 '>
        &larr; {previousPageTitle}
      </Link>
      {hasLogin && (
        <>
          <Link to={`/u/${userId}`} className=' mt-4  mr-10 hover:text-white/60 '>
            Your account
          </Link>
          <Link to={`/u/${userId}`} className=' mt-4  mr-10 hover:text-white/60 '>
            Notification
          </Link>
          <button className='font-semibold mt-8 mr-10 bg-[#01b4e4] rounded-md px-4 py-1.5 hover:bg-opacity-0 transition duration-300'>
            New Discussion
          </button>
        </>
      )}
      {!hasLogin && (
        <>
          <Link to={`/login`} className=' mt-4  mr-10 hover:text-white/60 '>
            Login
          </Link>
          <Link to={`/register`} className=' mt-4  mr-10 hover:text-white/60 '>
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}

export default SidebarDiscussion;
