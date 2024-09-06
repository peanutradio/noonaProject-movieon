import React from 'react';
import RecommendMovieSlide from '../RecommendMovieSlide/RecommendMovieSlide';
import SimilarMovieSlide from '../SimilarMovieSlide/SimilarMovieSlide';

const RecommendContent = () => {
  return (
    <div>
      <SimilarMovieSlide />
      <RecommendMovieSlide />
    </div>
  );
};

export default RecommendContent;