import React from 'react';
import { buildImageUrl, getColor } from 'src/helpers/utils';

type ReviewCardProps = {
  reviewTime: string;
  avatar: string;
  username: string;
  title: string;
  content: string;
  rating: number;
};
//1kks3YnVkpyQxzw36CObFPvhL5f.jpg

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewTime,
  username,
  title,
  content,
  rating,
  avatar
}) => {
  avatar = buildImageUrl(avatar, 'original');
  return (
    <div>
      <div className='flex mt-4 '>
        <img src={avatar} className='w-10 h-10' alt='avatar' />
        <div className='ml-4'>
          <p>{title}</p>
          <p className='text-xs text-white/60'>
            {reviewTime} written by {username}
          </p>
        </div>
        <span
          className={`text-sm font-semibold text-white ml-auto flex justify-center items-center w-9 h-9 top-4 left-4 border-2 rounded-full bg-background/60 ${getColor(
            rating
          )}`}
        >
          {rating === undefined ? 'NR' : rating.toFixed(1).toString()}
        </span>
      </div>
      <p className='border-border border-1 rounded-md p-5 mt-4'>{content}</p>
    </div>
  );
};

export default ReviewCard;
