import MovieCard from 'src/components/MovieCard';
import './test.css';
export default function ProductList() {
  return (
    <div className='container'>
      <MovieCard
        posterUrl='/src/assets/images/cover2.png'
        movieName='Reptile'
        rating={7.2}
        genres={['test', 'test']}
      ></MovieCard>
    </div>
  );
}
