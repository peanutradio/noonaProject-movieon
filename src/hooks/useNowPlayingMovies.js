import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchNowPlayingMovies = () => {
  return api.get(`/movie/now_playing?language`);
};

const useNowPlayingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-now-playing"],
    queryFn: fetchNowPlayingMovies,
    select: (result) => result.data,
  });
};

export default useNowPlayingMoviesQuery;
