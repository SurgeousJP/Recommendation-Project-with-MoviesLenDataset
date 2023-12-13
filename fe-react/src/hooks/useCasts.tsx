import { useQuery } from 'react-query';
import { getMovieCast } from 'src/helpers/api';
import { mapJsonToCasts } from 'src/helpers/utils';

const useCast = (id: string) => {
  return useQuery(['casts', id], () => getMovieCast(id), {
    select(data) {
      console.log(data);
      return mapJsonToCasts(data.cast);
    }
  });
};

export default useCast;
