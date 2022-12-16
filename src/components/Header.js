import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Covid-19 World Map</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <br></br>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <SearchBox />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
