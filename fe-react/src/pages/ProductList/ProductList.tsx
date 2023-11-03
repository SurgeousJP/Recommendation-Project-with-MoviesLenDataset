import MovieCard from 'src/components/MovieCard';
export default function ProductList() {
  return (
    <div className='w-auto h-screen bg-background '>
      <div className='relative h-[40rem] flex justify-center items-center px-24'>
        <div className=' bg-[url(/src/assets/images/backdrop.png)] bg-no-repeat bg-cover h-[40rem] w-full opacity-10 absolute left-0 top-0 '></div>
        <div className='relative flex w-full justify-between'>
          <MovieCard
            className='scale-50 md:scale-100'
            posterUrl='/src/assets/images/cover2.png'
            movieName='Reptile'
            rating={7.2}
            genres={['test', 'test']}
          ></MovieCard>

        </div>
      </div>
    </div>
  );
}
