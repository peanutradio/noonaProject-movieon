import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import useMovieReviewsQuery from '../../../../hooks/useMovieReviews';
import ReviewCard from '../ReviewCard/ReviewCard';

const ReviewContent = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieReviewsQuery(id);

  console.log('Review Data:', data); // Review 데이터 확인

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div>
      {data?.results?.length > 0 ? (
        data.results.map(review => <ReviewCard key={review.id} review={review} />)
      ) : (
        <p>리뷰가 없습니다</p>
      )}
    </div>
  );
};

export default ReviewContent;