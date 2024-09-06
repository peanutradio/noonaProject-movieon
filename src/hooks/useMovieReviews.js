import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieReviews = id => {
  return api.get(`/movie/${id}/reviews`);
};

const useMovieReviewsQuery = id => {
  return useQuery({
    queryKey: ['movie-reviews', id],
    queryFn: () => fetchMovieReviews(id),
    select: result => result.data,
    enabled: !!id,
  });
};

export default useMovieReviewsQuery;