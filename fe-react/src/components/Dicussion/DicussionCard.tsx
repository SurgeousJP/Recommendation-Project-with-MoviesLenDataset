import React from 'react';

type DiscussionCardProps = {
  subject: string;
  status: string;
  answerCount: number;
  profilePath: string;
  username: string;
  time: string;
};

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  subject,
  status,
  answerCount,
  profilePath,
  username,
  time
}) => {
  return (
    <div className='border-border border-1 shadow-md shadow-gray-800/70 flex py-3 px-4 items-center rounded-md'>
      <img className='rounded-full w-8 h-8' src={profilePath} alt='Profile' />
      <h2 className='ml-3'>{subject}</h2>
      <div className='ml-auto text-sm font-light flex items-center'>
        <p>{status ? 'Open' : 'Close'}</p>
        <p className='ml-12'>{answerCount}</p>
        <div className='ml-24 text-right'>
          <p>{time}</p>
          <p>by {username}</p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
