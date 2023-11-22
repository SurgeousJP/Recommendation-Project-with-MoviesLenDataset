import { useQuery } from 'react-query';
import { getUserProfile } from 'src/helpers/api';

const useUser = (id: number | undefined) => {
  return useQuery(['user', id], () => getUserProfile(id), {
    enabled: !!id
  });
};

export default useUser;
