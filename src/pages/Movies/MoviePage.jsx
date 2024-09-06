import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies";
import {
  Container,
  Spinner,
  Row,
  Col,
  Alert,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useMoviesGenreQuery } from "../../hooks/useMoviesGenre";
import "./MoviePage.style.css";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState("Genre");
  const [selectedSort, setSelectedSort] = useState("Most Popular");

  const keyword = query.get("q");
  const genreId = query.get("genre");

  const selectList = ["Most Popular", "Least Popular", "Latest", "Alphabetical"];

  useEffect(() => {
    setPage(0);
  }, [keyword, genreId]);

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
  const {
    data: genreData,
    isLoading: isGenreLoading,
    isError: isGenreError,
  } = useMoviesGenreQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  const sortByGenre = (genreId, genreName) => {
    if (genreId === null) {
      setQuery({});
    } else {
      setQuery({ genre: genreId });
    }
    setSelectedGenre(genreName);
    setPage(0);
  };

  const handleSort = (eventKey) => {
    setSelectedSort(eventKey);
    setPage(0);
  };

  if (isSearchLoading || isPopularLoading || isGenreLoading) {
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

  if (isSearchError || isGenreError) {
    return (
      <Alert variant="danger">
        {searchError?.message || "An error occurred"}
      </Alert>
    );
  }

  const filteredMovies = genreId
    ? searchData?.results?.filter((movie) =>
        movie.genre_ids.includes(parseInt(genreId, 10))
      )
    : searchData?.results;

  const sortedMovies = filteredMovies?.sort((a, b) => {
    switch (selectedSort) {
      case "Most Popular":
        return b.popularity - a.popularity;
      case "Least Popular":
        return a.popularity - b.popularity;
      case "Latest":
        return new Date(b.release_date) - new Date(a.release_date);
      case "Alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const renderMovies = (movies) => (
    <Row>
      {movies.map((movie, index) => (
        <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );

  const maxPages = 12;
  const totalPages = Math.min(searchData?.total_pages || 0, maxPages);

  return (
    <Container fluid className="movie-page-container">
      <Row>
        <Col lg={12} className="filter-container">
          <Row>
            <Col xs={6} md={3} lg={2}>
              <DropdownButton id="genre-dropdown" title={selectedGenre} className="w-100">
                <Dropdown.Item onClick={() => sortByGenre(null, "Genre")}>
                  All
                </Dropdown.Item>
                {genreData?.map((genre) => (
                  <Dropdown.Item
                    key={genre.id}
                    onClick={() => sortByGenre(genre.id, genre.name)}
                  >
                    {genre.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col xs={6} md={3} lg={2}>
              <DropdownButton
                id="sort-dropdown"
                title={selectedSort}
                onSelect={handleSort}
                className="w-100"
              >
                {selectList.map((item, index) => (
                  <Dropdown.Item key={index} eventKey={item}>
                    {item}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="movie-grid">
        <Col lg={12}>
          {keyword && sortedMovies?.length === 0 ? (
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
              <h3 className="text-white mb-4">Popular Movies</h3>
              {renderMovies(popularData?.results.slice(0, 8) || [])}
            </>
          ) : (
            renderMovies(sortedMovies || [])
          )}
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
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
    </Container>
  );
};

export default MoviePage;