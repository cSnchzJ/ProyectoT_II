import React from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

interface SiteNavProps {
  logOut: (() => void) | undefined;
}

const SiteNav: React.FC<SiteNavProps> = ({ logOut }) => {
  const handleLogout = () => {
    if (logOut) {
      logOut();
    } else {
      console.error("logOut function is undefined");
    }
  }

  return (
    <Navbar expand="lg" className="justify-content-md-center">
      <Container>
        <Navbar.Brand>Proyecto Terminal II</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/uploadElement">
              <Nav.Link>Subir Elemento</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/vistas">
              <Nav.Link>Ver Archivos</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={handleLogout}>Salir</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNav;
