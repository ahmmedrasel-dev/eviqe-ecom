import React, { useContext } from 'react';
import { Alert, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import { FiTrash2 } from "react-icons/fi";
import './cart.css'
import Breadcums from '../Breadcums/Breadcums';
import { toast } from 'react-toastify';
const Cart = () => {
  const { state, dispatch } = useContext(Store)
  const { cart: { cartItems } } = state;
  const navigate = useNavigate()
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


  return (
    <Container>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <Row className='mt-3'>
        <Breadcums page={'cart'}></Breadcums>
        <Col lg={8}>
          {
            cartItems.length === 0 ?
              <Alert variant='danger'>
                Cart is empty
              </Alert>
              :

              <ListGroup>
                {
                  cartItems.map(item => (
                    <ListGroup.Item>

                      <Row className='align-items-center'>
                        <Col lg={1}>
                          <img src={item.img} width="80px" className='rounded' alt="" />
                        </Col>

                        <Col lg={6}>
                          <Link to={`/cartproduct/${item._id}`} className="mx-5">{item.name.slice(0, 20)}</Link>
                        </Col>

                        <Col lg={3}>
                          <Button disabled={item.quantity == 1} variant='success' onClick={() => handleQty(item, item.quantity - 1)}>-</Button>
                          <span className='mx-3'>{item.quantity}</span>
                          <Button disabled={item.quantity == item.stock} variant='success' onClick={() => handleQty(item, item.quantity + 1)}>+</Button>

                        </Col>

                        <Col lg={2}>
                          <Button variant='danger' onClick={() => handleRemoveItem(item)}><FiTrash2 /></Button>
                        </Col>

                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
          }
        </Col>
        <Col lg={4}>
          <Card className='card-summary p-2'>
            <Card.Header><h3 className='text-uppercase'>Cart Summary</h3></Card.Header>
            <Card.Body>
              <p>Total Quantity: {cartItems.reduce((accomolator, current) => accomolator + current.quantity, 0)}</p>
              <p>Total Price: ${cartItems.reduce((accomolator, current) => accomolator + current.price * current.quantity, 0)}</p>
            </Card.Body>
            <Button className="btn btn-dark checkout" type="button" onClick={handleCheckout}>Checkout</Button>
          </Card>
        </Col>
      </Row>

    </Container >
  );
};

export default Cart;