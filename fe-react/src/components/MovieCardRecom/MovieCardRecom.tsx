import React from 'react';

interface MovieCardRecomProps {
  posterUrl: string;
  rating: number;
  title: string;
}

const MovieCardRecom: React.FC<MovieCardRecomProps> = ({ posterUrl, rating, title }) => {
  return (
    <div className='w-60'>
      <img className='h-32 w-60 rounded-md' src={posterUrl} alt={title} />
      <div className='flex'>
        <h2>{title}</h2>
        <p className='ml-auto'> {rating * 10}%</p>
      </div>
    </div>
  );
};

export default MovieCardRecom;
