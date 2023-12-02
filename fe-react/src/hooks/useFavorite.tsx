import { useMutation } from 'react-query';
import { updateUserProfile } from 'src/helpers/api';
import useUser from './useUser';

const useFavorite = (userId: number | undefined, favoriteId: number, onSuccess?: () => void) => {
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
            favorite_list: user.favorite_list.includes(favoriteId)
              ? user.favorite_list.filter(id => id !== favoriteId)
              : [...user.favorite_list, favoriteId]
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

export default useFavorite;
