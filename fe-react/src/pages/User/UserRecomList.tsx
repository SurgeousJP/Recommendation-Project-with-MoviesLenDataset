import React from 'react';
import { useQueries } from 'react-query';
import LoadingIndicator from 'src/components/LoadingIndicator';
import MovieCardSearch from 'src/components/MovieCardSearch/MovieCardSearch';
import MovieCardUser from 'src/components/MovieCardUser';
import { getMovieDetail } from 'src/helpers/api';
import { buildImageUrl, formatDateToDDMMYYYY, mapJsonToMovie } from 'src/helpers/utils';

interface UserRecomListProps {
  movieIds: number[];
}

const UserRecomList: React.FC<UserRecomListProps> = ({ movieIds }) => {
  console.log('movieIds', movieIds);
  if (movieIds === null)
    return (
      <div className='mt-4'>
        <p>
          We don&apos;t have enough data to suggest any movies. You can help by rating movies
          you&apos;ve seen.
        </p>
      </div>
    );

  const movieQueries = useQueries(
    movieIds.map(movieId => {
      return {
        queryKey: ['movie', movieId],
        queryFn: () => getMovieDetail(movieId.toString())
      };
    })
  );

  const isLoading = movieQueries.some(result => result.isLoading);

  return (
    <div className='mt-3'>
      <h2 className='text-2xl font-bold mb-3'>My Recommendations</h2>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className='space-y-3'>
          {movieQueries.map((res, index) => {
            const movie = mapJsonToMovie(res.data);
            return (
              <MovieCardUser
                key={index}
                movieId={movie.id}
                posterPath={buildImageUrl(movie.posterPath, 'original')}
                title={movie.title}
                releaseDate={formatDateToDDMMYYYY(movie.releaseDate)}
                overview={movie.overview}
                avgRating={movie.rating}
                canRemove={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserRecomList;
