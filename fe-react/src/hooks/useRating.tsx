import axios from 'axios';
import { useMutation } from 'react-query';
import { buildApiUrl } from 'src/helpers/api';

interface Rating {
  user_id: number;
  movie_id: number;
  rating: number;
  timestamp: number;
}

const useRating = () => {
  const createRating = async (rating: Rating) => {
    const ratingWithTimestamp = { ...rating, timestamp: Math.floor(Date.now() / 1000) };
    console.log(ratingWithTimestamp);
    const response = await axios.post(buildApiUrl('rating/create'), ratingWithTimestamp);
    return response.data;
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(createRating);

  return { createRating: mutate, isLoading, isError, isSuccess };
};

export default useRating;
