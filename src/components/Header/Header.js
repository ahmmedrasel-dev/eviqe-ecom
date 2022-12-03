import React, { useContext, useState } from 'react';
import { Badge, Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import './header.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

const Header = () => {
  const { state, dispatch, state3, dispatch3 } = useContext(Store);
  const { cart: { cartItems } } = state;
  const { userInfo } = state3;

  const navigate = useNavigate();
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

  const handleCheckout = () => {
    navigate('/signin?redirect=/shipping');
  }

  const handleLogout = () => {
    dispatch3({ type: "USER_LOGOUT" });
    localStorage.removeItem('userInfo');
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link to='/' className='text-white'>Eviqe Ecom</Link></Navbar.Brand>
        <Nav className="ms-auto menu">
          <Link to="/">Home</Link>
          <Link to="/product">Product</Link>
          <Link to="/productCompare">Product Compare</Link>
          <Button variant="dark" onClick={handleShow} className="me-2 offCart">
            <FiShoppingCart />
            {
              cartItems.length > 0 && (
                <Badge pill bg="danger" className='cartCound'>
                  {cartItems.length}
                </Badge>
              )
            }
          </Button>
          <Link to='/wishlist'>Wishlist</Link>
          <Link to="/cart">Cart
            {
              cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.length}
                </Badge>
              )
            }
          </Link>
          {
            userInfo ?
              <>
                {console.log(userInfo)}
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>

                </NavDropdown>
              </> : <Link to='/login'>Login</Link>
          }

        </Nav>
      </Container>

      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            cartItems.map(item => (
              <div key={item._id}>
                <img className='me-2' width="50" src={item.img} alt="" />
                <Link className='me-2' to={`product/${item.slug}`}>{item.name.slice(0, 10)}</Link>
                <Button disabled={item.quantity == 1} variant='success' onClick={() => handleQty(item, item.quantity - 1)}>-</Button>
                <span className='mx-3'>{item.quantity}</span>
                <Button disabled={item.quantity == item.stock} variant='success' onClick={() => handleQty(item, item.quantity + 1)}>+</Button>

                <Button className='ms-2' variant='danger' onClick={() => handleRemoveItem(item)}><FiTrash2 /></Button>

                <hr />
              </div>
            ))
          }

          <Button className="btn btn-dark checkout" type="button" onClick={handleCheckout}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar >
  );
};

export default Header;