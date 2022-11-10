import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link to='/' className='text-white'>Eviqe Ecom</Link></Navbar.Brand>
        <Nav className="ms-auto menu">
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;