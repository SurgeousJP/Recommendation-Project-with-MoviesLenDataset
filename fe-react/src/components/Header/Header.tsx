import React from 'react';
import logo from 'src/assets/images/Logo.png';

export default function Header() {
  return (
    <header className='py-4 bg-background border-b-1 border-border z-50'>
      <div className='flex items-center'>
        <a href='/'>
        <img className='ml-8 w-24 h-4' src={logo} alt='Logo'></img>

        </a>
        <nav>
          <ul className=' text-white hidden lg:flex lg:space-x-14 md:ml-8 md:transform-none xl:ml-16 w-auto'>
            <li>
              <a className='hover:text-primary transition ease-out duration-300' href='movies'>
                Movies
              </a>
            </li>
            <li>
              <a className='hover:text-primary transition ease-out duration-300' href='tv-shows'>
                Tv shows
              </a>
            </li>
            <li>
              <a className='hover:text-primary transition ease-out duration-300' href='people'>
                People
              </a>
            </li>
            <li>
              <a className='hover:text-primary transition ease-out duration-300' href='people'>
                More
              </a>
            </li>
          </ul>
        </nav>
        <div className='flex items-center relative ml-auto'>
          <input
            className='ml-auto mr-6 w-64 hidden lg:block xl:mr-10 xl:w-80 h-9 pr-8 rounded-md'
            placeholder='Search...'
          ></input>
          <svg
            className='w-4 h-4 hover:text-primary md:hover:text-white md:hover:cursor-auto text-white absolute right-12 transition ease-out duration-300 cursor-pointer'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            ></path>
          </svg>
        </div>
        <button className='border-none group/lang flex items-center w-auto px-1 hover:bg-transparent hover:text-primary'>
          <span>EN</span>
          <svg
            className='pl-1 w-4 h-4 text-white group-hover/lang:text-primary transition ease-out duration-300'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            ></path>
          </svg>
        </button>
        <button className='w-auto px-5 h-9 ml-6 mr-10 xl:ml-11 xl:mr-18'>Sign in</button>
        <svg
          className='w-6 h-6 lg:hidden mr-6 text-white transition ease-out duration-300 hover:text-primary cursor-pointer'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          ></path>
        </svg>
      </div>
    </header>
  );
}
