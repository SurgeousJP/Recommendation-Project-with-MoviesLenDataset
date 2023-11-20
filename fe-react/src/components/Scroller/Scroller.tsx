import React, { ReactNode, useState } from 'react';

interface ScrollerProps {
  viewMore?: boolean;
  children?: ReactNode[];
}

const Scroller: React.FC<ScrollerProps> = ({ children, viewMore }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = e => {
    if (e.target.scrollLeft >= 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  return (
    <div
      className={`relative after:content-[""] after:w-14 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-r after:transition-opacity after:duration-500 from-textbox/0 to-textbox ${
        scrolled ? 'after:opacity-0' : 'after:opacity-100'
      }`}
    >
      <ol className={'flex space-x-4 pb-5 scrollbar overflow-x-scroll'} onScroll={handleScroll}>
        {children?.map((child, index) => <li key={index}>{child}</li>)}
        {viewMore && (
          <a className='font-bold flex items-center' href='cast'>
            <span className='w-24'>View more &rarr;</span>
          </a>
        )}
      </ol>
    </div>
  );
};

export default Scroller;
