import React from "react";
import { useNavigate } from 'react-router-dom';
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMoviesGenreQuery } from "../../hooks/useMoviesGenre";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { data: genreData } = useMoviesGenreQuery();

  const showMovieDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    return genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : '';
    });
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
      onClick={showMovieDetail}
      role="button"
      tabIndex={0}
    >
      <div className="overlay">
        <div>
          <h1>{movie.title}</h1>
          <div className="genre-container">
            {showGenre(movie.genre_ids).map((genreName, index) => (
              <Badge key={index} bg="danger" className="genre-badge">
                {genreName}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="average">{movie.vote_average.toFixed(1)}</div>
          <div className="popularity">{movie.popularity}</div>
          <div
            className="adult"
            data-adult={movie.adult ? "over18" : "under18"}
          >
            {movie.adult ? "over18" : "under18"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;