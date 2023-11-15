import { useQuery } from 'react-query';
import axios from 'axios';
import { mapJsonToCrews } from 'src/helpers/utils';
import { buildApiUrl } from 'src/helpers/api';

const useCrew = (id: string) => {
  const fetchCrew = async (id: string) => {
    const { data } = await axios.get(buildApiUrl(`crew/get/${id}`));
    return data;
  };

  return useQuery(['crew', id], () => fetchCrew(id), {
    select(data) {
      return mapJsonToCrews(data.crew);
    }
  });
};

export default useCrew;
