import { useQuery } from 'react-query';
import axios from 'axios';
import { buildApiUrl } from 'src/helpers/api';

const useKeyword = (id: string) => {
  const fetchKeyword = async (id: string) => {
    const { data } = await axios.get(buildApiUrl(`keyword/get/${id}`));
    return data.keyword_list;
  };

  return useQuery(['keyword', id], () => fetchKeyword(id));
};

export default useKeyword;
