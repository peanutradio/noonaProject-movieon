import React, { forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import useMovieCreditsQuery from '../../../../hooks/useMovieCredits';
import './DetailViewContent.style.css';

const DetailViewContent = forwardRef(({ data }, ref) => {
  const { id } = useParams(); 

  const { data: creditsData, isLoading, isError, error } = useMovieCreditsQuery(id);


  const castList =
    creditsData?.cast
      ?.slice(0, 10)
      .map(castMember => castMember.name)
      .join(', ') || '정보 없음';

  const director = creditsData?.crew?.find(member => member.known_for_department === 'Directing')?.name || '정보 없음';

  const posterImage = data.poster_path
    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`
    : 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg?size=626&ext=jpg';

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div className='detail-view-content-area' ref={ref}>
      <div className='poster-box'>
        <img src={posterImage} alt={data.title} />
      </div>
      <div className='detail-info-box'>
        <em className='preview-title'>{data.title}</em>
        <p className='detail-desc'>{data.overview}</p>
        <table className='detail-info-table'>
          <tr>
            <th scope='row'>Release Date</th>
            <td>{data.release_date}</td>
          </tr>
          <tr>
            <th scope='row'>Genre</th>
            <td>{data.genres.map(genre => genre.name).join(', ')}</td>
          </tr>
          <tr>
            <th scope='row'>Actor</th>
            <td>{castList}</td>
          </tr>
          <tr>
            <th scope='row'>Director</th>
            <td>{director}</td>
          </tr>
          <tr>
            <th scope='row'>Average</th>
            <td>{data.vote_average}</td>
          </tr>
          <tr>
            <th scope='row'>Popular</th>
            <td>{data.popularity}</td>
          </tr>
          <tr>
            <th scope='row'>Budget</th>
            <td>
              {data.budget.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
          </tr>

        </table>
      </div>
    </div>
  );
});

export default DetailViewContent;