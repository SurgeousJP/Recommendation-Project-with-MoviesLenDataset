import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'src/assets/images/Logo.png';

type HeaderProps = {
  isOpen: boolean;
  onBurgerMenuClick: () => void;
};

export default function Header(props: HeaderProps) {
  const { onBurgerMenuClick, isOpen } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    onBurgerMenuClick();
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Perform the action you want when Enter is pressed
      navigate(`/search?query=${searchQuery}`);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <header className='py-4 fixed top-0 left-0 w-full bg-background border-b-1 border-border z-50'>
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
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
            className='ml-auto mr-6 w-64 hidden lg:block xl:mr-10 xl:w-80 h-9 pr-8 rounded-md'
            placeholder='Search...'
          ></input>
          <svg
            className='w-4 h-4 hover:text-primary text-white absolute right-12 transition ease-out duration-300 cursor-pointer'
            onClick={() => navigate(`/search?query=${searchQuery}`)}
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
        <button
          className='w-auto px-5 h-9 ml-6 mr-10 xl:ml-11 xl:mr-18'
          onClick={() => navigate('/login')}
        >
          Sign in
        </button>
        <nav>
          <button
            className={` w-10 h-10 mr-6 lg:hidden relative focus:outline-none border-none hover:bg-transparent hover:text-primary transition ease-out ${
              isOpen ? 'text-primary' : 'text-white'
            }`}
            onClick={toggleMenu}
          >
            <span className='sr-only'>Open main menu</span>
            <div className='block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2'>
              <span
                aria-hidden='true'
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  isOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                aria-hidden='true'
                className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${
                  isOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                aria-hidden='true'
                className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
                  isOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
}
