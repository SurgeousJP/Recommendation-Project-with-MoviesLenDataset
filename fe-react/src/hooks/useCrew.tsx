import { useQuery } from 'react-query';
import { mapJsonToCrews } from 'src/helpers/utils';
import { getMovieCrew } from 'src/helpers/api';

const useCrew = (id: string) => {
  return useQuery(['crew', id], () => getMovieCrew(id), {
    select(data) {
      return mapJsonToCrews(data.crew);
    }
  });
};

export default useCrew;
