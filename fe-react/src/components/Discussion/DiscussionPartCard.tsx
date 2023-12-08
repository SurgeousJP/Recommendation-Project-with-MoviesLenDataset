import React from 'react';
import DiscussionPart from 'src/types/DiscussionPart.type';

interface DiscussionPartCardProps {
  discussionPart: DiscussionPart;
  subject: string;
  isReply?: boolean;
}
function DiscussionPartCard({ discussionPart, subject, isReply }: DiscussionPartCardProps) {
  const options = {
    month: 'short', // abbreviated month name
    day: 'numeric', // day of the month
    year: 'numeric', // full year
    hour: 'numeric', // hour in 12-hour format
    minute: 'numeric', // minute
    hour12: true // use 12-hour time format
  };

  return (
    <div className='border-border border-1 '>
      <div className='p-2 w-full bg-[#24232b] flex items-center border-border border-b-1'>
        <img className='rounded-full w-10 h-10' src={discussionPart.profile_path} alt='Profile' />
        <div className='ml-4 '>
          {!isReply && <h2 className='text-lg font-semibold'>{subject}</h2>}
          {isReply && (
            <h2 className='text-lg '>
              Reply by <span className='font-semibold'>{discussionPart.name}</span>
            </h2>
          )}

          <span className=' font-light'>
            {!isReply && <>posted by {discussionPart.name} </>}
            on {new Date(discussionPart.timestamp).toLocaleString('en-US', options)}
          </span>
        </div>
      </div>
      <div
        className='discussion-part p-4  border-border border-b-1'
        dangerouslySetInnerHTML={{ __html: discussionPart.description }}
      ></div>
      <div className='text-sm py-2 px-4 flex justify-between'>
        <div className='flex space-x-2'>
          <button className='flex items-center'>
            <img className='w-5 h-5' src='/src/assets/images/like.svg' alt='like button' />
            Like
          </button>

          <button className='flex items-center'>
            <img className='w-5 h-5' src='/src/assets/images/quote.svg' alt='quote button' />
            Quote
          </button>
        </div>
        <div className='flex space-x-3'>
          <button>Report</button>
          <button>Ignore</button>
        </div>
      </div>
    </div>
  );
}

export default DiscussionPartCard;
