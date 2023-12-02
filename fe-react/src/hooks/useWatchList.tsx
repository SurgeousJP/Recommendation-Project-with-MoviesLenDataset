import { useMutation } from 'react-query';
import { updateUserProfile } from 'src/helpers/api';
import useUser from './useUser';

const useWatchList = (userId: number | undefined, movieId: number, onSuccess?: () => void) => {
  const { data: user } = useUser(userId);
  const mutation = useMutation(updateUserProfile, {
    onSuccess: onSuccess
  });

  const updateFavorite = async () => {
    try {
      // Wait for the user profile to be fetched
      const updatedUser = user
        ? {
            ...user,
            watch_list: user.watch_list.includes(movieId)
              ? user.watch_list.filter(id => id !== movieId)
              : [...user.watch_list, movieId]
          }
        : null;
      await mutation.mutateAsync(updatedUser);
    } catch (error) {
      // Handle errors, if needed
      console.error('Error updating user profile', error);
    }
  };

  return { ...mutation, mutate: updateFavorite };
};

export default useWatchList;
