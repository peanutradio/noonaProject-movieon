import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSimilarMovie = (id) => {
  return api.get(`/movie/${id}/similar?language`);
};

const useSimilarMovieQuery = (id) => {
  return useQuery({
    queryKey: ["similar-movie", id],
    queryFn: () => fetchSimilarMovie(id),
    select: (result) => result.data,
    enabled: !!id, // movieId가 있을 때만 쿼리 실행
  });
};

export default useSimilarMovieQuery;
