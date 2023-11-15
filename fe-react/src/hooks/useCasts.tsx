import { useQuery } from 'react-query';
import axios from 'axios';
import { mapJsonToCasts } from 'src/helpers/utils';
import { buildApiUrl } from 'src/helpers/api';

const useCast = (id: string) => {
  const fetchCast = async (id: string) => {
    const { data } = await axios.get(buildApiUrl(`cast/get/${id}`));
    return data;
  };

  return useQuery(['casts', id], () => fetchCast(id), {
    select(data) {
      return mapJsonToCasts(data.cast);
    }
  });
};

export default useCast;
