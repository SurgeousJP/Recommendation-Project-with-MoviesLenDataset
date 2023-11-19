import { getColor, formatDateToDDMMYYYY, buildImageUrl } from 'src/helpers/utils';
import CastCard from 'src/components/CastCard/CastCard';
import Scroller from 'src/components/Scroller/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tooltip } from 'react-tooltip';

import { useEffect, useState } from 'react';
import ReviewCard from 'src/components/ReviewCard/ReviewCard';
import MovieCardRecom from 'src/components/MovieCardRecom';
import { useParams } from 'react-router-dom';
import DiscussionCard from 'src/components/Dicussion/DicussionCard';
import { Rating } from 'react-simple-star-rating';
import useRating from 'src/hooks/useRating';
import useMovieDetail from 'src/hooks/useMovieDetail';
import useCast from 'src/hooks/useCasts';
import useCrew from 'src/hooks/useCrew';
import useKeyword from 'src/hooks/useKeyword';
import { useUser } from 'src/hooks/useUser';
import { deleteMovieRating, getMovieRatingByUser, updateMovieRating } from 'src/helpers/api';
import { useMutation } from 'react-query';

export default function Details() {
  const [isRatingVisible, setRatingVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const { id } = useParams();
  const user = useUser();
  const isLogin = user.user != null;
  useEffect(() => {
    const fetchRating = async () => {
      if (user.user != null && id != null) {
        try {
          const userRating = await getMovieRatingByUser(user.user.user.id, id);
          console.log(userRating);
          setHasRated(true);
          setRating(userRating.rating);
        } catch (error) {
          console.error('Error fetching user rating:', error);
        }
      }
    };

    fetchRating();
  }, [user.user, id]);
  const MockDiscussionData = {
    subject: 'Sample Discussion',
    status: 'Open',
    answerCount: 5,
    profilePath: '/t/p/w45_and_h45_face/1kks3YnVkpyQxzw36CObFPvhL5f.jpg',
    username: 'john_doe',
    time: new Date(2023, 10, 12, 3, 4, 0)
  };
  const handleButtonClick = () => {
    setRatingVisible(!isRatingVisible);
  };
  const handleCreateRatingSuccess = () => {
    setHasRated(true);
  };
  const { createRating } = useRating(handleCreateRatingSuccess);
  const { mutate: updateRating } = useMutation(updateMovieRating);
  const { mutate: deleteRating } = useMutation(deleteMovieRating);

  const handleRating = (rate: number) => {
    console.log(rate);
    setRating(rate);
    if (id == null) return;
    console.log(hasRated);
    if (hasRated === true) {
      updateRating({ user_id: user.user.user.id, movie_id: parseInt(id), rating: rate });
    } else {
      createRating({ user_id: user.user.user.id, movie_id: parseInt(id), rating: rate });
    }
  };
  const handleDeleteRating = () => {
    if (id == null) return;
    setRating(0);
    setHasRated(false);
    deleteRating({ userId: user.user.user.id, movieId: id });
  };
  const options = {
    month: 'short', // abbreviated month name
    day: 'numeric', // day of the month
    year: 'numeric', // full year
    hour: 'numeric', // hour in 12-hour format
    minute: 'numeric', // minute
    hour12: true // use 12-hour time format
  };

  const { data: movie } = useMovieDetail(id || '');
  const { data: casts } = useCast(id || '');
  const { data: crews } = useCrew(id || '');
  const { data: keywords } = useKeyword(id || '');

  return (
    <div className='w-auto bg-background '>
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
            className='w-72 h-[27rem] object-cover rounded-lg'
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
                  isLogin ? 'Add to list' : 'Login to create and edit custom lists'
                }
                data-tooltip-place='bottom'
                className='rounded-full w-12 h-12 border-none hover:bg-gray-600 bg-gray-700 p-2'
              >
                <img className='w-5 h-5' src='/src/assets/images/list.svg' alt='Add to list' />
              </button>
              <button
                data-tooltip-id='my-tooltip'
                data-tooltip-content={
                  isLogin ? 'Mark as favourite' : 'Login to add this movie to your favourites list'
                }
                data-tooltip-place='bottom'
                className='rounded-full w-12 h-12 border-none hover:bg-gray-600 bg-gray-700 p-2'
              >
                <img className='w-5 h-5' src='/src/assets/images/favourite.svg' alt='Add to list' />
              </button>
              <button
                data-tooltip-id='my-tooltip'
                data-tooltip-content={
                  isLogin ? 'Add to your watchlist' : 'Login to add this movie to your watchlist'
                }
                data-tooltip-place='bottom'
                className='rounded-full w-12 h-12 border-none hover:bg-gray-600 bg-gray-700 p-2'
              >
                <img className='w-5 h-5' src='/src/assets/images/watchlist.svg' alt='Add to list' />
              </button>
              <div className='relative'>
                <button
                  id='clickable'
                  className='rounded-full w-12 h-12 border-none hover:bg-gray-600 bg-gray-700 p-2'
                  onClick={handleButtonClick}
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
                  {isLogin ? 'Rating' : 'Login to rate this movie'}
                </Tooltip>

                <Tooltip
                  hidden={!isLogin}
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
              <p>{movie?.overview}</p>
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
      <div className='flex mt-6'>
        <div className='pl-24 pr-10 w-[calc(100vw_-_80px_-_268px)] '>
          <div className='border-border border-b-1'>
            <h2 className='text-2xl font-semibold mb-3'>Top Billed Cast</h2>
            <Scroller viewMore>
              {casts?.map((cast, index) => (
                <CastCard
                  key={index}
                  imageUrl={buildImageUrl(cast.profilePath, 'w500')}
                  name={cast.name}
                  character={cast.character}
                  profilePath={cast.profilePath}
                />
              ))}
            </Scroller>
            <h3 className='font-semibold my-6'>
              <a className='hover:opacity-70' href='cast'>
                Full Cast & Crew
              </a>
            </h3>
          </div>
          <div>
            <h2 className='text-2xl font-semibold mb-3 mt-3'>Social</h2>
            <Tabs>
              <TabList>
                <Tab>Reviews</Tab>
                <Tab>Discussions</Tab>
              </TabList>

              <TabPanel>
                <div className='border-border border-b-1'>
                  <ReviewCard
                    avatar='1kks3YnVkpyQxzw36CObFPvhL5f.jpg'
                    content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
                    some form, by injected humour, or randomised words which don't look even slightly believable. If you are going
                    to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
                    text."
                    rating={8.5}
                    reviewTime='24.08.2018, 17:53'
                    title='Best Marvel movie? in my opinion'
                    username='Johnny Sin'
                  ></ReviewCard>
                  <h3 className='font-semibold my-6'>
                    <a className='hover:opacity-70' href='reviews'>
                      Read All Reviews
                    </a>
                  </h3>
                </div>
              </TabPanel>
              <TabPanel>
                <DiscussionCard
                  answerCount={MockDiscussionData.answerCount}
                  profilePath={buildImageUrl(MockDiscussionData.profilePath, 'original')}
                  status={MockDiscussionData.status}
                  subject={MockDiscussionData.subject}
                  time={MockDiscussionData.time.toLocaleString('en-US', options)}
                  username={MockDiscussionData.username}
                ></DiscussionCard>
              </TabPanel>
            </Tabs>
          </div>
          <h2 className='text-2xl font-semibold mb-3 mt-3'>Recommendations</h2>
          <Scroller>
            <MovieCardRecom
              posterUrl={buildImageUrl(movie?.backdropPath, 'original')}
              rating={movie?.rating}
              title={movie?.title ?? ''}
              key={1}
            ></MovieCardRecom>
            <MovieCardRecom
              posterUrl={buildImageUrl(movie?.backdropPath, 'original')}
              rating={movie?.rating}
              title={movie?.title ?? ''}
              key={2}
            ></MovieCardRecom>
            <MovieCardRecom
              posterUrl={buildImageUrl(movie?.backdropPath, 'original')}
              rating={movie?.rating}
              title={movie?.title ?? ''}
              key={4}
            ></MovieCardRecom>
            <MovieCardRecom
              posterUrl={buildImageUrl(movie?.backdropPath, 'original')}
              rating={movie?.rating}
              title={movie?.title ?? ''}
              key={5}
            ></MovieCardRecom>
          </Scroller>
          <p>
            We don&apos;t have enough data to suggest any movies based on Reptile. You can help by
            rating movies you&apos;ve seen.
          </p>
        </div>
        <div className='px-2 min-w-[15rem]'>
          <a href={movie?.homepage} rel='noreferrer' target='_blank'>
            <svg
              className='w-6 h-6'
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
                d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
              ></path>
            </svg>
          </a>
          <p className='font-bold mt-9'>Status</p>
          <p>{movie?.status ?? '-'}</p>
          <p className='font-bold mt-5'>Original Language</p>
          <p>{movie?.originalLanguage ?? '-'}</p>
          <p className='font-bold mt-5'>Budget</p>
          <p>{movie?.budget ? `$${movie?.budget.toLocaleString()}` : '-'}</p>
          <p className='font-bold mt-5'>Revenue</p>
          <p>{movie?.revenue ? `$${movie?.revenue.toLocaleString()}` : '-'}</p>
          <div className='border-border border-b-1 mb-2 pb-6'>
            <h4 className='font-bold mt-6 text-lg'>Keywords</h4>
            <ul className='mt-2 flex flex-wrap'>
              {keywords?.map((keyword: string, index: number) => (
                <li key={index}>
                  <p className='text-sm p-2 border w-fit border-border rounded-[0.1875rem] mr-2 mt-2'>
                    {keyword}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
