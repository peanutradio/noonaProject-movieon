import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const [expanded, setExpanded] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()
  const searchByKeyword=(event)=>{
    event.preventDefault()
    /// url 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  }
  return (
    <div
      style={{ backgroundColor: "#141414", minHeight: "100vh", color: "white" }}
    >
      <Navbar
        expanded={expanded}
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "rgba(0,0,0,0.9)", padding: "0 4%" }}
      >
        <Container fluid style={{ maxWidth: "100%" }}>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ color: "#E50914", fontSize: "2rem", fontWeight: "bold" }}
          >
            NETFLIX
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                as={Link}
                to="/"
                style={{ color: "#e5e5e5" }}
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/movies"
                style={{ color: "#e5e5e5" }}
                onClick={() => setExpanded(false)}
              >
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex mt-2 mt-lg-0" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="제목, 사람, 장르"
                className="me-2"
                aria-label="Search"
                style={{
                  backgroundColor: "rgba(0,0,0,0.75)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.85)",
                  borderRadius: "4px",
                }}
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid style={{ paddingTop: "20px", maxWidth: "100%" }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default AppLayout;
