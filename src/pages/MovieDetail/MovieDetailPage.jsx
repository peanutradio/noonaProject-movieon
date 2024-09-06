import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Badge, Button, Spinner } from 'react-bootstrap';
import useMovieDetailQuery from '../../hooks/useMovieDetail';
import useMovieVideoQuery from '../../hooks/useMovieVideo';
import TrailerVideoModal from './components/TrailerVideoModal/TrailerVideoModal';
import DetailViewContent from './components/DetailViewContent/DetailViewContent';
import RecommendContent from './components/RecommendContent/RecommendContent';
import ReviewContent from './components/ReviewContent/ReviewContent';
import './MovieDetailPage.style.css';

const MovieDetailPage = () => {
  const menuList = ['Details', 'Recommendations', 'Reviews'];

  const [modalShow, setModalShow] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Details');

  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: videoData } = useMovieVideoQuery(id);

  const detailViewRef = useRef(null);

  const handleMenuSelect = event => {
    const selectedMenu = event.currentTarget.textContent;
    setActiveMenu(selectedMenu);

    if (selectedMenu === 'Preview') {
      setModalShow(true);
    }
  };



  
  const handleShowMore = () => {
    detailViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const trailerKey = videoData?.results?.[0]?.key;

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div className='section'>
      <div
        className='movie-detail-banner'
        style={{
          backgroundImage: data.backdrop_path ? `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.backdrop_path})` : 'none',
          backgroundColor: data.backdrop_path ? 'transparent' : '#252525',
        }}
      >
        <div className='banner-content'>
          <h1>{data.title}</h1>
          <div className='movie-detail-info'>
            <p>{data.release_date}</p>
            <p>{data.runtime} minutes</p>
            <div className={`movie-age detail-age ${data.adult ? 'adult' : 'all'}`}></div>
          </div>
          <div className='movie-genre'>
            {data.genres.map(genre => (
              <Badge key={genre.id} bg='warning' text='dark' className='genre-badge'>
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className='play-button'>
            <Button variant='danger' onClick={() => setModalShow(true)}>
              Preview<span className='btn-play'> ▶</span>
            </Button>
          </div>
          <p className='overview'>
            {data.overview.length < 100 ? data.overview : `${data.overview.slice(0, 100)}...`}
            {data.overview.length > 100 && (
              <Button variant='link' className='show-more-button' onClick={handleShowMore}>
                Show More
              </Button>
            )}
          </p>
        </div>
      </div>
      <TrailerVideoModal show={modalShow} onHide={() => setModalShow(false)} movieID={trailerKey} />
      <div className='bottom-contents'>
        <div className='content-nav'>
          <ul>
            {menuList.map(menu => (
              <li key={menu}>
                <button type='button' onClick={handleMenuSelect} className={activeMenu === menu ? 'on' : ''}>
                  {menu}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='movie-detail-info-container'>
          {activeMenu === 'Details' && <DetailViewContent data={data} ref={detailViewRef} />}
          {activeMenu === 'Recommendations' && <RecommendContent />}
          {activeMenu === 'Reviews' && <ReviewContent />}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;