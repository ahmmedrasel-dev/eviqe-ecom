import React, { useContext } from 'react';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import './header.css';

const Header = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link to='/' className='text-white'>Eviqe Ecom</Link></Navbar.Brand>
        <Nav className="ms-auto menu">
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link to="/cart">Cart
            {
              cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.length}
                </Badge>
              )
            }
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;