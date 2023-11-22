import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Rating } from 'react-simple-star-rating';
import { Tooltip } from 'react-tooltip';
import { updateMovieRating, deleteMovieRating, getMovieRatingByUser } from 'src/helpers/api';
import { buildImageUrl, formatDateToDDMMYYYY, getColor } from 'src/helpers/utils';
import useCrew from 'src/hooks/useCrew';
import useRating from 'src/hooks/useRating';
import Movie from 'src/types/Movie';

interface MovieDetailsProps {
  movie: Movie | undefined;
  hasLogin: boolean;
  userId: number;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, hasLogin, userId }) => {
  const [isRatingVisible, setRatingVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const handleCreateRatingSuccess = () => {
    setHasRated(true);
  };
  const { createRating } = useRating(handleCreateRatingSuccess);
  const { mutate: updateRating } = useMutation(updateMovieRating);
  const { mutate: deleteRating } = useMutation(deleteMovieRating);
  const { data: crews } = useCrew(movie?.id.toString() || '');

  useEffect(() => {
    const fetchRating = async () => {
      if (userId != null && movie?.id != null) {
        try {
          const userRating = await getMovieRatingByUser(userId, movie.id.toString());
          console.log(userRating);
          setHasRated(true);
          setRating(userRating.rating);
        } catch (error) {
          console.error('Error fetching user rating:', error);
        }
      }
    };

    fetchRating();
  }, [userId, movie?.id]);
  const handleRating = (rate: number) => {
    console.log(rate);
    setRating(rate);
    console.log(hasRated);
    if (hasRated === true) {
      updateRating({ user_id: userId, movie_id: movie?.id, rating: rate });
    } else {
      createRating({ user_id: userId, movie_id: movie?.id, rating: rate });
    }
  };
  const handleDeleteRating = () => {
    setRating(0);
    setHasRated(false);
    deleteRating({ userId: userId, movieId: movie?.id.toString() });
  };
  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleRatingButton = () => {
    setRatingVisible(!isRatingVisible);
  };

  return (
    <div className='relative md:h-96 lg:h-[40rem] flex justify-center items-center lg:px-24 '>
      <div className='md:h-96 lg:h-[40rem] w-full overflow-hidden absolute left-0 top-0 '>
        <img
          src={`${buildImageUrl(movie?.backdropPath, 'original')}`}
          className='w-full h-auto opacity-10'
          alt='backdrop'
        ></img>
      </div>
      <div className='relative flex w-full lg:scale-100 scale-75 items-center'>
        <img
          className='w-80 h-[29rem] object-cover rounded-lg'
          src={`${buildImageUrl(movie?.posterPath, 'w500')}`}
          alt='cover'
        ></img>
        <div className='ml-6'>
          <h1 className='text-white text-4xl block font-bold capitalize flex-col'>
            {movie?.title}{' '}
            <span className='font-normal opacity-70'>
              {movie?.releaseDate ? `(${movie?.releaseDate.getFullYear()})` : ''}
            </span>
          </h1>
          <div className='mt-4'>
            <span className='rounded-md border-white/75 border-1 py-[0.31rem] px-[0.62rem] mr-2 text-base text-white/75'>
              PG-13
            </span>
            <span>
              {formatDateToDDMMYYYY(movie?.releaseDate)} ({movie?.productionCountries})
            </span>
            {movie?.genres && (
              <span className="before:content-['•'] before:mx-1">{movie?.genres.join(', ')}</span>
            )}
            {movie?.runtime && (
              <span className="before:content-['•'] before:mx-1">{movie?.runtime}</span>
            )}
          </div>
          <div className='mt-4 flex items-center space-x-4'>
            <span
              className={`text-xl font-semibold text-white flex justify-center items-center w-16 h-16 border-[3.5px] rounded-full bg-background/60 ${getColor(
                movie?.rating
              )}`}
            >
              {movie?.rating === undefined ? 'NR' : movie?.rating?.toFixed(1).toString()}
            </span>
            <button
              data-tooltip-id='my-tooltip'
              data-tooltip-content={
                hasLogin ? 'Add to list' : 'Login to create and edit custom lists'
              }
              data-tooltip-place='bottom'
              className='rounded-full w-12 h-12 border-none hover:bg-gray-600 bg-gray-700 p-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='white'
                viewBox='0 0 256 256'
              >
                <path d='M224,56V72a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56ZM56,48H40a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H56a8,8,0,0,0,8-8V56A8,8,0,0,0,56,48Zm160,64H96a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A8,8,0,0,0,216,112ZM56,112H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H56a8,8,0,0,0,8-8V120A8,8,0,0,0,56,112Zm160,64H96a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176ZM56,176H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H56a8,8,0,0,0,8-8V184A8,8,0,0,0,56,176Z'></path>
              </svg>{' '}
            </button>
            <button
              data-tooltip-id='my-tooltip'
              data-tooltip-content={
                hasLogin ? 'Mark as favourite' : 'Login to add this movie to your favourites list'
              }
              data-tooltip-place='bottom'
              className='rounded-full w-12 h-12 border-none hover:bg-gray-600 bg-gray-700 p-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='#f4ebeb'
                viewBox='0 0 256 256'
              >
                <path d='M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z'></path>
              </svg>{' '}
            </button>
            <button
              data-tooltip-id='my-tooltip'
              data-tooltip-content={
                hasLogin ? 'Add to your watchlist' : 'Login to add this movie to your watchlist'
              }
              data-tooltip-place='bottom'
              className='rounded-full w-12 h-12 border-none hover:bg-gray-600 bg-gray-700 p-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='#f4ebeb'
                viewBox='0 0 256 256'
              >
                <path d='M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z'></path>
              </svg>{' '}
            </button>
            <div className='relative'>
              <button
                id='clickable'
                className='rounded-full w-12 h-12 border-none hover:bg-gray-600 bg-gray-700 p-2'
                onClick={handleRatingButton}
              >
                <svg
                  className={`w-5 h-5 ${hasRated ? 'fill-yellow-400' : 'fill-white'}`}
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 256 256'
                >
                  <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
                </svg>
              </button>
              <Tooltip
                style={{ backgroundColor: 'rgb(55, 65, 81)' }}
                id='rating'
                anchorSelect='#clickable'
                place='bottom'
              >
                {hasLogin ? 'Rate this movie' : 'Login to rate this movie'}
              </Tooltip>

              <Tooltip
                hidden={!hasLogin}
                style={{ backgroundColor: 'rgb(55, 65, 81)' }}
                opacity={1}
                id='rating-clickable'
                anchorSelect='#clickable'
                place='bottom'
                openOnClick
                clickable
              >
                <div className='flex items-center'>
                  <svg
                    onClick={handleDeleteRating}
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='white'
                    viewBox='0 0 256 256'
                  >
                    <path d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm40,112H88a8,8,0,0,1,0-16h80a8,8,0,0,1,0,16Z'></path>
                  </svg>
                  <Rating
                    allowFraction={true}
                    initialValue={rating}
                    onClick={handleRating}
                    /* Available Props */
                  />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className='mt-4'>
            <h3 className='italic font-normal text-lg text-white/60'>{movie?.tagline}</h3>
            <h3 className='font-bold text-xl'>Overview</h3>
            <p className=''>{movie?.overview}</p>
            <ol className='flex md:space-x-16 lg:space-x-20 xl:space-x-44 mt-4'>
              {crews?.map(crew => (
                <li key={crew.id}>
                  <p className='font-bold'>{crew.name}</p>
                  <p className='text-sm'>{crew.job}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
