import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchRecommendations = id => {
  return api.get(`/movie/${id}/recommendations?language`);
};

const useRecommendationsQuery = id => {
  return useQuery({
    queryKey: ['recommendations', id],
    queryFn: () => fetchRecommendations(id),
    select: result => result.data,
    enabled: !!id,
  });
};

export default useRecommendationsQuery;