import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";
// import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
// import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";

// 1. 배너 ==> popular 영화를 들고와서 첫번째 아이템을 보여준다.
// 2. Popular movie
// 3. Top rated movie
// 4. Upcoming movie

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />

    </div>
  );
};

export default Homepage;