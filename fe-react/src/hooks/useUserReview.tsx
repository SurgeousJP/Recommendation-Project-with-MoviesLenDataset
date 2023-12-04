import { useMutation } from 'react-query';
import useUser from './useUser';
import { createMovieReview } from 'src/helpers/api';
import Review from 'src/types/Review';

const useUserReview = (userId: number | undefined, movieId: number, onSuccess?: () => void) => {
  const { data: user } = useUser(userId);
  const mutation = useMutation(createMovieReview, {
    onSuccess: onSuccess
  });

  const createReview = async (comment: string) => {
    try {
      // Wait for the user profile to be fetched
      const review: Review = {
        movie_id: movieId,
        user_id: userId,
        comment: comment,
        username: user?.username,
        picture_profile: user?.picture_profile
      };
      console.log(review);
      await mutation.mutateAsync(review);
    } catch (error) {
      // Handle errors, if needed
      console.error('Error create review', error);
    }
  };

  return { ...mutation, mutate: createReview };
};

export default useUserReview;
