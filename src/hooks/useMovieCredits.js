import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieCredits = (id) => {
  return api.get(`/movie/${id}/credits?language`);
};

const useMovieCreditsQuery = (id) => {
  return useQuery({
    queryKey: ["movie-credits", id],
    queryFn: () => fetchMovieCredits(id),
    select: (result) => result.data,
    enabled: !!id,
  });
};

export default useMovieCreditsQuery;
