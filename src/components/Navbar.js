import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FiAlignJustify } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NavbarComponent = ({ toggleSidebar }) => {
  return (
    <Navbar bg="light" expand="lg" className="fixed-top mb-5"> {/* Добавлен класс "fixed-top" и отступ mb-5 */}
      <Container>
        <Nav className="ml-auto">
          <Nav.Link onClick={toggleSidebar}>
            <FiAlignJustify size={24} />
          </Nav.Link>
        </Nav>
        <Navbar.Brand as={Link} to="/">Университетские конференции</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
