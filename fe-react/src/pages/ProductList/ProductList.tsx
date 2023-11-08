import MovieCard from 'src/components/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState } from 'react';

export default function ProductList() {
  const [backdropURL, setBackdropURL] = useState('/src/assets/images/backdrop.png');

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    draggable: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    afterChange: current => {
      setBackdropURL(cardData[current].backdropURL);
    }
  };
  let sliderRef = useRef(null);
  const onClickNext = () => {
    sliderRef.slickNext();
  };
  const onClickPrev = () => {
    sliderRef.slickPrev();
  };
  const cardData = [
    {
      posterUrl: '/src/assets/images/cover2.png',
      movieName: 'Reptile',
      rating: 7.2,
      genres: ['test', 'test'],
      backdropURL: '/src/assets/images/backdrop.png'
    },
    {
      posterUrl: '/src/assets/images/cover2.png',
      movieName: 'Reptile 1',
      rating: 5.2,
      genres: ['test', 'test'],
      backdropURL:
        'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg'
    },
    {
      posterUrl: '/src/assets/images/cover2.png',
      movieName: 'Reptile 2',
      rating: 6.8,
      genres: ['test', 'test'],
      backdropURL:
        'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/z9PfYCwpecdCX5qNCC9Fk5CiPFq.jpg'
    },
    {
      posterUrl: '/src/assets/images/cover2.png',
      movieName: 'Reptile 3 ',
      rating: 4.0,
      genres: ['test', 'test'],
      backdropURL:
        'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/1jKBfRyeyJvBkJSKvNQ4nhIzTSx.jpg'
    },
    {
      posterUrl: '/src/assets/images/cover2.png',
      movieName: 'Reptile 4',
      rating: 8.9,
      genres: ['test', 'test'],
      backdropURL:
        'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg'
    },
    {
      posterUrl: '/src/assets/images/cover2.png',
      movieName: 'Reptile 5',
      rating: 9.0,
      genres: ['test', 'test'],
      backdropURL:
        'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/oGkh6ByqaSKXlW6SkIOBXJWvLan.jpg'
    },
    {
      posterUrl: '/src/assets/images/cover2.png',
      movieName: 'Reptile 6',
      genres: ['test', 'test'],
      backdropURL:
        'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/a0GM57AnJtNi7lMOCamniiyV10W.jpg'
    }
  ];
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
                    className='scale-50 md:scale-100'
                    posterUrl={card.posterUrl}
                    movieName={card.movieName}
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
