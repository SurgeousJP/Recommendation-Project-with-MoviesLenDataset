import {
  getColor,
  mapJsonToMovie,
  formatDateToDDMMYYYY,
  mapJsonToCrews,
  buildImageUrl
} from 'src/helpers/utils';
import Movie from 'src/types/Movie';
import movieData from 'src/assets/data/movies.json';
import crewData from 'src/assets/data/crews.json';
import CastCard from 'src/components/CastCard/CastCard';
import { useState } from 'react';

export default function Details() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = e => {
    console.log(e.target.scrollLeft);
    if (e.target.scrollLeft >= 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  console.log(crewData.crew);
  const movie: Movie = mapJsonToMovie(movieData);
  movie.crews = mapJsonToCrews(crewData.crew)
    .sort((a, b) => a.id - b.id)
    .slice(0, 3);
  console.log(movie);
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
      <div id='cast_scroller' className='px-2'>
        <h2 className='text-2xl font-semibold mt-6 mb-3'>Top Billed Cast</h2>
        <div
          className={`relative after:content-[""] after:w-14 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-r after:transition-opacity after:duration-500 from-textbox/0 to-textbox ${
            scrolled ? 'after:opacity-0' : 'after:opacity-100'
          }`}
        >
          <ol className={'flex space-x-4 pb-5 scrollbar overflow-x-scroll'} onScroll={handleScroll}>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li>
              <CastCard
                character='Captain Robert Allen'
                name='Eric Bogosian'
                imageUrl='https://www.themoviedb.org/t/p/w138_and_h175_face/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'
              />
            </li>
            <li className='flex ml-3 items-center'>
              <p className=' w-36'>
                <a className='font-bold' href='cast'>
                  View more &rarr;
                </a>
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
