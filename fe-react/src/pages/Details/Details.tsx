import {
  getColor,
  mapJsonToMovie,
  formatDateToDDMMYYYY,
  mapJsonToCrews,
  buildImageUrl,
  mapJsonToCasts
} from 'src/helpers/utils';
import Movie from 'src/types/Movie';
import movieData from 'src/assets/data/movies.json';
import crewData from 'src/assets/data/crews.json';
import keywordData from 'src/assets/data/keywords.json';
import castData from 'src/assets/data/cast.json';
import CastCard from 'src/components/CastCard/CastCard';
import Scroller from 'src/components/Scroller/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'src/react-tabs.css';

import { useState } from 'react';
import ReviewCard from 'src/components/ReviewCard/ReviewCard';
import MovieCardRecom from 'src/components/MovieCardRecom';

export default function Details() {
  const movie: Movie = mapJsonToMovie(movieData);
  movie.crews = mapJsonToCrews(crewData.crew)
    .sort((a, b) => a.id - b.id)
    .slice(0, 3);
  movie.casts = mapJsonToCasts(castData.cast);
  console.log(movie.casts);
  return (
    <div className='w-auto bg-background '>
      <div className='relative h-[40rem] flex justify-center items-center px-24'>
        <div className='h-[40rem] w-full overflow-hidden absolute left-0 top-0 '>
          <img
            src={`${buildImageUrl(movie.backdropPath, 'original')}`}
            className='w-full h-auto opacity-10'
            alt='backdrop'
          ></img>
        </div>
        <div className='relative flex w-full'>
          <img
            className='w-72 h-[27rem] object-cover rounded-lg'
            src={`${buildImageUrl(movie.posterPath, 'w500')}`}
            alt='cover'
          ></img>
          <div className='ml-6 mt-14'>
            <h1 className='text-white text-4xl block font-bold capitalize flex-col'>
              {movie.title}{' '}
              <span className='font-normal opacity-70'>({movie.releaseDate.getFullYear()})</span>
            </h1>
            <div className='mt-4'>
              <span className='rounded-md border-white/75 border-1 py-[0.31rem] px-[0.62rem] mr-2 text-base text-white/75'>
                PG-13
              </span>
              <span>
                {formatDateToDDMMYYYY(movie.releaseDate)} ({movie.productionCountries})
              </span>
              <span className="before:content-['•'] before:mx-1">{movie.genres.join(', ')}</span>
              <span className="before:content-['•'] before:mx-1">{movie.runtime}</span>
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
              <ol className='flex justify-between mr-80 mt-4'>
                {movie.crews?.map(crew => (
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
              {movie.casts.map((cast, index) => (
                <CastCard
                  key={index}
                  imageUrl={cast.profilePath}
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
                <h2>Any content 2</h2>
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
              {keywordData.keyword_list.map(keyword => (
                <li key={keywordData.keyword_list.indexOf(keyword)}>
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
