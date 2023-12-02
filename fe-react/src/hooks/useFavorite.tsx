import { useMutation } from 'react-query';
import useUserProfile from './useUserProfile';
import { updateUserProfile } from 'src/helpers/api';

const useFavorite = (userId: string, favoriteId: number, onSuccess?: () => void) => {
  const { data: user } = useUserProfile(userId);
  console.log('user', user, userId);
  const mutation = useMutation(updateUserProfile, {
    onSuccess: onSuccess
  });

  const updateFavorite = async () => {
    try {
      // Wait for the user profile to be fetched
      const updatedUser = user
        ? { ...user, favorite_list: [...user.favorite_list, favoriteId] }
        : null;
      console.log('updatedUser', updatedUser);
      await mutation.mutateAsync(updatedUser);
    } catch (error) {
      // Handle errors, if needed
      console.error('Error updating user profile', error);
    }
  };

  return { ...mutation, mutate: updateFavorite };
};

export default useFavorite;
