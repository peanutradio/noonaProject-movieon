import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import api from "../../utils/api";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

//경로 2가지
// nav 바에서 클릭해서 온 경우 => popularMovie
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때마다 page 바꿔주기
// page 값이 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // 로딩 중일 때 스피너 표시
  if (isLoading) {
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

  // 에러 발생 시 알림 표시
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 페이지 수를 12페이지로 제한
  const maxPages = 12;
  const totalPages = Math.min(data?.total_pages || 0, maxPages);

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          {" "}
          필터{" "}
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {/* 영화 카드 렌더링 */}
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          {/* 페이지네이션 컴포넌트 */}
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages} //전체페이지 몇개인가~? (최대 12페이지로 제한)
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
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;