import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { createMovieRating } from 'src/helpers/api';
import Rating from 'src/types/Rating';

const useRating = (onSuccess?: () => void) => {
  const createRating = async (rating: Rating) => {
    return await createMovieRating(rating);
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(createRating, {
    onSuccess: onSuccess
  });

  return { createRating: mutate, isLoading, isError, isSuccess };
};

export default useRating;
