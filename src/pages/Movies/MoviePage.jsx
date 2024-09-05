import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies";
import { Container, Spinner, Row, Col, Alert } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(0);

  const keyword = query.get("q");

  // 키워드가 변경될 때마다 페이지를 0으로 리셋
  useEffect(() => {
    setPage(0);
  }, [keyword]);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearchMovieQuery({
    keyword,
    page: page + 1,
  });

  const { data: popularData, isLoading: isPopularLoading } =
    usePopularMoviesQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  if (isSearchLoading || isPopularLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }

  if (isSearchError) {
    return <Alert variant="danger">{searchError.message}</Alert>;
  }

  const renderMovies = (movies) => (
    <Row>
      {movies.map((movie, index) => (
        <Col key={index} lg={4} xs={12} className="mb-4">
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );

  const maxPages = 12;
  const totalPages = Math.min(searchData?.total_pages || 0, maxPages);

  return (
    <Container>
      {keyword && searchData?.results.length === 0 ? (
        <>
          <Alert variant="info" className="text-center p-5 mb-4">
            <h4 className="alert-heading">
              Sorry, there is no result of your search.
            </h4>
            <p className="mb-0">
              Please try different keywords or check out our popular movies
              below.
            </p>
          </Alert>
          <h2 className="mb-4">Popular Movies</h2>
          {renderMovies(popularData?.results || [])}
        </>
      ) : (
        <Row>
          <Col lg={4} xs={12}>
            {" "}
            필터{" "}
          </Col>
          <Col lg={8} xs={12}>
            {renderMovies(searchData?.results || [])}
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MoviePage;
