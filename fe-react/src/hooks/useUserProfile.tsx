import { useQuery } from 'react-query';
import { getUserProfile } from 'src/helpers/api';

const useUserProfile = (userId: string) => {
  return useQuery(['userProfile', userId], () => getUserProfile(userId));
};

export default useUserProfile;
