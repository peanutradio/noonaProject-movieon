import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import useRecommendationsQuery from '../../../../hooks/useRecommendations';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import responsive from '../../../../constants/responsive';

const RecommendMovieSlide = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRecommendationsQuery(id);

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider title='Recommend Movies' movies={data.results} responsive={responsive} />
    </div>
  );
};

export default RecommendMovieSlide;