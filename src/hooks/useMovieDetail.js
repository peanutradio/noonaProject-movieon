import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (id) => {
  return api.get(`/movie/${id}?language`);
};

const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => fetchMovieDetail(id),
    select: (result) => result.data,
    enabled: !!id, // movieId가 있을 때만 쿼리 실행
  });
};

export default useMovieDetailQuery;
