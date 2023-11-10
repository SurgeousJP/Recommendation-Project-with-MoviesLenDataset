import MovieCard from 'src/components/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';
import { buildApiUrl } from 'src/helpers/api';
import { buildImageUrl, mapJsonToMovie } from 'src/helpers/utils';
import Movie from 'src/types/Movie';

export default function ProductList() {
  const [backdropURL, setBackdropURL] = useState('/src/assets/images/backdrop.png');
  const [cardData, setCardData] = useState<Array<Movie>>([]);

  useEffect(() => {
    fetch(buildApiUrl('movie/get/page/1'))
      .then(response => response.json())
      .then(data => {
        setCardData(
          data.map((movie: any) => {
            const tmp = mapJsonToMovie(movie);
            console.log(tmp);
            return tmp;
          })
        );
      });
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    draggable: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    afterChange: current => {
      setBackdropURL(buildImageUrl(cardData[current].backdropPath, 'original'));
    }
  };
  let sliderRef = useRef(null);
  const onClickNext = () => {
    sliderRef.slickNext();
  };
  const onClickPrev = () => {
    sliderRef.slickPrev();
  };

  return (
    <div className='w-auto h-screen bg-background '>
      <div className='relative md:h-96 lg:h-[40rem] flex justify-center items-center lg:px-24 '>
        <div className='md:h-96 lg:h-[40rem] w-full overflow-hidden absolute left-0 top-0 '>
          <img
            loading='lazy'
            src={backdropURL}
            className='w-full h-auto opacity-10'
            alt='backdrop'
          ></img>
        </div>
        <div className='relative flex w-full flex-col justify-between'>
          <div className='flex'>
            <h1 className='text-4xl uppercase'>Trending</h1>
            <button
              className='ml-auto border-none mr-4 hover:bg-transparent w-fit group/left'
              onClick={onClickPrev}
            >
              <svg
                className='w-6 h-6 text-gray-400 group-hover/left:text-white transition'
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
                  d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                ></path>
              </svg>
            </button>
            <button
              className='border-none hover:bg-transparent w-fit group/right'
              onClick={onClickNext}
            >
              <svg
                className='w-6 h-6  text-gray-400 group-hover/right:text-white transition'
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
                  d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                ></path>
              </svg>
            </button>
          </div>
          <div className='mt-12'>
            <Slider
              ref={slider => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {cardData.map((card, index) => {
                return (
                  <MovieCard
                    key={index}
                    id={card.id}
                    className='scale-50 md:scale-100'
                    posterUrl={buildImageUrl(card.posterPath, 'w500')}
                    movieName={card.title}
                    rating={card.rating}
                    genres={card.genres}
                  ></MovieCard>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
