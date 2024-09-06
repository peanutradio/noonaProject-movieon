import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  // console.log("ddd", data);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // data가 있고, results 배열이 존재하며 비어있지 않은 경우에만 배경 이미지를 설정
  const movie = data?.results?.[0];
  const backgroundImage = movie
    ? `url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.poster_path})`
    : "none";

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{data.results[0].title}</h1>
        <p>{data.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;