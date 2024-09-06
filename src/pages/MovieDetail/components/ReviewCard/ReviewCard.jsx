import React, { useState } from 'react';
import './ReviewCard.style.css';

const ReviewCard = ({ review }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const showMoreContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className='review-card'>
      <h3>{review.author}</h3>
      {showFullContent && review.content.length > 200 ? (
        <p>{review.content}</p>
      ) : (
        <p>{review.content.slice(0, 200)}...</p>
      )}
      {review.content.length > 200 && (
        <button type='button' onClick={showMoreContent} className='show-more-btn'>
          {!showFullContent && review.content.length > 200 ? 'Show more' : showFullContent ? 'Show less' : null}
        </button>
      )}
      <p>
        <small>{new Date(review.created_at).toLocaleDateString()}</small>
      </p>
    </div>
  );
};

export default ReviewCard;