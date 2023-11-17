import { useQuery } from 'react-query';
import { searchMovie } from 'src/helpers/api';
import { mapJsonToMovie } from 'src/helpers/utils';

const useSearchMovie = (query: string, page: string) => {
  return useQuery(['search-movies', query, page], () => searchMovie(query, page), {
    select(data) {
      return data.map((movie: any) => mapJsonToMovie(movie));
    }
  });
};

export default useSearchMovie;
