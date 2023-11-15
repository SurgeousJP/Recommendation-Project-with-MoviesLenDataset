import { useQuery } from 'react-query';
import axios from 'axios';
import { buildApiUrl } from 'src/helpers/api';
import { mapJsonToMovie } from 'src/helpers/utils';

const fetchMovieDetail = async (movieId: string) => {
  const res = await axios.get(buildApiUrl(`movie/get/${movieId}`));
  console.log(res.data);
  return res.data;
};

const useMovieDetail = (movieId: string) => {
  const { isLoading, isError, data, error } = useQuery(
    ['movieDetail', movieId],
    () => fetchMovieDetail(movieId),
    {
      select(data) {
        return mapJsonToMovie(data);
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
