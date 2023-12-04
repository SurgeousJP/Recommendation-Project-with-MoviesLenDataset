import React from 'react';
import { buildImageUrl, getColor } from 'src/helpers/utils';

type ReviewCardProps = {
  reviewTime: string;
  avatar: string;
  username: string;
  title: string;
  content: string;
};
//1kks3YnVkpyQxzw36CObFPvhL5f.jpg

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewTime,
  username,
  title,
  content,
  avatar
}) => {
  return (
    <div>
      <div className='flex mt-4 '>
        <img src={avatar} className='w-10 h-10 rounded-full overflow-hidden' alt='avatar' />
        <div className='ml-4'>
          <p>{title}</p>
          <p className='text-xs text-white/60'>
            Written by {username} on {reviewTime}
          </p>
        </div>
      </div>
      <p className='border-border border-1 rounded-md p-5 mt-4 line-clamp-5'>{content}</p>
    </div>
  );
};

export default ReviewCard;
