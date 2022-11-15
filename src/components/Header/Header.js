import React, { useContext, useState } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import './header.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

const Header = () => {
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleQty = (item, quantity) => {
    dispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity }
    })
    toast.success('Quanity Updated')
  }

  const handleRemoveItem = (item) => {
    dispatch({
      type: 'REMOVE_CART_ITEM',
      payload: item
    })
    toast.warn('Product add to cart')
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link to='/' className='text-white'>Eviqe Ecom</Link></Navbar.Brand>
        <Nav className="ms-auto menu">
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Button variant="dark" onClick={handleShow} className="me-2 offCart">
            <FiShoppingCart />
          </Button>

          <Link to="/cart">Cart
            {
              cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.length}
                </Badge>
              )
            }
          </Link>
        </Nav>
      </Container>

      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            cartItems.map(item => (
              <>
                <img className='me-2' width="50" src={item.img} alt="" />
                <Link className='me-2' to={`product/${item.slug}`}>{item.name.slice(0, 10)}</Link>
                <Button disabled={item.quantity == 1} variant='success' onClick={() => handleQty(item, item.quantity - 1)}>-</Button>
                <span className='mx-3'>{item.quantity}</span>
                <Button disabled={item.quantity == item.stock} variant='success' onClick={() => handleQty(item, item.quantity + 1)}>+</Button>

                <Button className='ms-2' variant='danger' onClick={() => handleRemoveItem(item)}><FiTrash2 /></Button>
                <hr />
              </>
            ))
          }
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};

export default Header;