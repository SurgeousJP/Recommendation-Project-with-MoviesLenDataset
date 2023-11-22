import { useQuery } from 'react-query';
import { getUserRating } from 'src/helpers/api';

const useUserRating = (data: {
  id: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  return useQuery(['userRating', data.id], () => getUserRating(data.id), {
    onSuccess: data.onSuccess,
    onError: data.onError,
    select: data => {
      console.log('data', data);
      return data.map(item => {
        return {
          movieId: item.movie_id,
          rating: item.rating * 2
        };
      });
    }
  });
};

export default useUserRating;
