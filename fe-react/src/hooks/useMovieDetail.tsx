import { useQuery, useQueryClient } from 'react-query';
import { getMovieDetail } from 'src/helpers/api';
import { mapJsonToMovie } from 'src/helpers/utils';

const useMovieDetail = (movieId: string) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ['movieDetail', movieId],
    () => getMovieDetail(movieId),
    {
      select(data) {
        return mapJsonToMovie(data);
      },
      initialData: () => {
        const movie = queryClient
          .getQueryData('movies')
          ?.movies?.find(movie => movie.id == movieId);
        if (movie) {
          console.log('yes');

          return mapJsonToMovie(movie);
        } else {
          return undefined;
        }
      }
    }
  );

  return {
    isLoading,
    isError,
    data,
    error
  };
};

export default useMovieDetail;
