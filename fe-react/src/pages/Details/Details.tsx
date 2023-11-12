import {
  getColor,
  mapJsonToMovie,
  formatDateToDDMMYYYY,
  mapJsonToCrews,
  buildImageUrl,
  mapJsonToCasts
} from 'src/helpers/utils';
import CastCard from 'src/components/CastCard/CastCard';
import Scroller from 'src/components/Scroller/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { useEffect, useState } from 'react';
import ReviewCard from 'src/components/ReviewCard/ReviewCard';
import MovieCardRecom from 'src/components/MovieCardRecom';
import { useParams } from 'react-router-dom';
import { buildApiUrl } from 'src/helpers/api';
import Movie from 'src/types/Movie';
import Cast from 'src/types/Cast';
import Crew from 'src/types/Crew';
import DiscussionCard from 'src/components/Dicussion/DicussionCard';

export default function Details() {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
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
  const { id } = useParams();
  useEffect(() => {
    fetch(buildApiUrl(`movie/get/${id}`))
      .then(response => response.json())
      .then(data => {
        console.log(mapJsonToMovie(data));
        setMovie(mapJsonToMovie(data));
      });
    fetch(buildApiUrl(`keyword/get/${id}`))
      .then(response => response.json())
      .then(data => {
        setKeywords(data.keyword_list);
      });
    fetch(buildApiUrl(`cast/get/${id}`))
      .then(response => response.json())
      .then(data => {
        setCasts(mapJsonToCasts(data.cast));
        console.log(mapJsonToCasts(data.cast));
      });
    fetch(buildApiUrl(`crew/get/${id}`))
      .then(response => response.json())
      .then(data => {
        setCrews(mapJsonToCrews(data.crew));
      });
  }, []);
  return (
    <div className='w-auto bg-background '>
      <div className='relative md:h-96 lg:h-[40rem] flex justify-center items-center lg:px-24 '>
        <div className='md:h-96 lg:h-[40rem] w-full overflow-hidden absolute left-0 top-0 '>
          <img
            src={`${buildImageUrl(movie.backdropPath, 'original')}`}
            className='w-full h-auto opacity-10'
            alt='backdrop'
          ></img>
        </div>
        <div className='relative flex w-full lg:scale-100 scale-75 items-center'>
          <img
            className='w-72 h-[27rem] object-cover rounded-lg'
            src={`${buildImageUrl(movie.posterPath, 'w500')}`}
            alt='cover'
          ></img>
          <div className='ml-6'>
            <h1 className='text-white text-4xl block font-bold capitalize flex-col'>
              {movie.title}{' '}
              <span className='font-normal opacity-70'>
                {movie.releaseDate ? `(${movie.releaseDate.getFullYear()})` : ''}
              </span>
            </h1>
            <div className='mt-4'>
              <span className='rounded-md border-white/75 border-1 py-[0.31rem] px-[0.62rem] mr-2 text-base text-white/75'>
                PG-13
              </span>
              <span>
                {formatDateToDDMMYYYY(movie.releaseDate)} ({movie.productionCountries})
              </span>
              {movie.genres && (
                <span className="before:content-['•'] before:mx-1">{movie.genres.join(', ')}</span>
              )}
              {movie.runtime && (
                <span className="before:content-['•'] before:mx-1">{movie.runtime}</span>
              )}
            </div>
            <div className='mt-4'>
              <span
                className={`text-xl font-semibold text-white flex justify-center items-center w-16 h-16 border-[3.5px] rounded-full bg-background/60 ${getColor(
                  movie.rating
                )}`}
              >
                {movie.rating === undefined ? 'NR' : movie.rating.toFixed(1).toString()}
              </span>
            </div>
            <div className='mt-4'>
              <h3 className='italic font-normal text-lg text-white/60'>{movie.tagline}</h3>
              <h3 className='font-bold text-xl'>Overview</h3>
              <p>{movie.overview}</p>
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
              {casts.map((cast, index) => (
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
                    title='Best Marvel movie in my opinion'
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
              posterUrl={buildImageUrl(movie.backdropPath, 'original')}
              rating={movie.rating}
              title={movie.title}
              key={1}
            ></MovieCardRecom>
            <MovieCardRecom
              posterUrl={buildImageUrl(movie.backdropPath, 'original')}
              rating={movie.rating}
              title={movie.title}
              key={2}
            ></MovieCardRecom>
            <MovieCardRecom
              posterUrl={buildImageUrl(movie.backdropPath, 'original')}
              rating={movie.rating}
              title={movie.title}
              key={4}
            ></MovieCardRecom>
            <MovieCardRecom
              posterUrl={buildImageUrl(movie.backdropPath, 'original')}
              rating={movie.rating}
              title={movie.title}
              key={5}
            ></MovieCardRecom>
          </Scroller>
          <p>
            We don&apos;t have enough data to suggest any movies based on Reptile. You can help by
            rating movies you&apos;ve seen.
          </p>
        </div>
        <div className='px-2 min-w-[15rem]'>
          <a href={movie.homepage} rel='noreferrer' target='_blank'>
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
          <p>{movie.status ?? '-'}</p>
          <p className='font-bold mt-5'>Original Language</p>
          <p>{movie.originalLanguage ?? '-'}</p>
          <p className='font-bold mt-5'>Budget</p>
          <p>{movie.budget ? `$${movie.budget.toLocaleString()}` : '-'}</p>
          <p className='font-bold mt-5'>Revenue</p>
          <p>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : '-'}</p>
          <div className='border-border border-b-1 mb-2 pb-6'>
            <h4 className='font-bold mt-6 text-lg'>Keywords</h4>
            <ul className='mt-2 flex flex-wrap'>
              {keywords.map((keyword, index) => (
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
