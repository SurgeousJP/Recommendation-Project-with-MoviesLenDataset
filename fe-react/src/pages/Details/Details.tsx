import { buildImageUrl } from 'src/helpers/utils';
import CastCard from 'src/components/CastCard/CastCard';
import Scroller from 'src/components/Scroller/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReviewCard from 'src/components/ReviewCard/ReviewCard';
import MovieCardRecom from 'src/components/MovieCardRecom';
import { useParams } from 'react-router-dom';
import DiscussionCard from 'src/components/Dicussion/DicussionCard';
import useMovieDetail from 'src/hooks/useMovieDetail';
import useCast from 'src/hooks/useCasts';
import useKeyword from 'src/hooks/useKeyword';
import MovieDetails from './MovieDetails';
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import useUser from 'src/hooks/useUser';
import useUserId from 'src/hooks/useUserId';

export default function Details() {
  const { id } = useParams();
  const [toggleReview, setToggleReview] = useState(false);

  const { userId, hasLogin } = useUserId();

  const MockDiscussionData = {
    subject: 'Sample Discussion',
    status: 'Open',
    answerCount: 5,
    profilePath: '/t/p/w45_and_h45_face/1kks3YnVkpyQxzw36CObFPvhL5f.jpg',
    username: 'john_doe',
    time: new Date(2023, 10, 12, 3, 4, 0)
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
  const { data: keywords } = useKeyword(id || '');

  const handleToggleReview = () => {
    setToggleReview(!toggleReview);
  };

  return (
    <div className='w-auto bg-background '>
      <MovieDetails movie={movie} userId={userId} hasLogin={hasLogin} />
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
                <Tab>Discussions</Tab>
                <Tab>Reviews</Tab>
              </TabList>

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
                  <a className='hover:opacity-70' href='reviews'>
                    <h3 className='font-semibold my-5'>Read All Reviews</h3>
                  </a>
                </div>
                <ReviewForm hidden={toggleReview} className='mt-4' userId={userId} />
                <button
                  className='font-semibold text-primary w-fit border-none hover:bg-transparent h-fit text-base normal-case my-3 hover:opacity-70'
                  onClick={handleToggleReview}
                >
                  {!toggleReview ? 'Cancel' : 'Write a Review'}
                </button>
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
