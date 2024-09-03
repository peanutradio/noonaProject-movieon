import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <div>
          <h1>{movie.title}</h1>
          {movie.genre_ids.map((id) => (
            <Badge key={id} bg="danger">
              {id}
            </Badge>
          ))}
        </div>
        <div>
          <div className="average">{movie.vote_average}</div>
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
