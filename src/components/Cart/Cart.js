import React, { useContext } from 'react';
import { Alert, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import { FiTrash2 } from "react-icons/fi";
const Cart = () => {
  const { state, dispatch } = useContext(Store)
  const { cart: { cartItems } } = state;

  const handleQty = (item, quantity) => {
    dispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity }
    })
  }

  const handleRemoveItem = (item) => {
    dispatch({
      type: 'REMOVE_CART_ITEM',
      payload: item
    })
  }


  return (
    <Container>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Row className='mt-5'>
        <Col lg={8}>
          {
            cartItems.length < 0 ?
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
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header><h3 className='text-uppercase'>Cart Summary</h3></Card.Header>
            <Card.Body>
              <h5>Total Quantity: {cartItems.reduce((accomolator, current) => accomolator + current.quantity, 0)}</h5>
              <h5>Total Price: ${cartItems.reduce((accomolator, current) => accomolator + current.price * current.quantity, 0)}</h5>

              <div className="d-grid gap-2">
                <Button class="btn btn-primary" type="button">Checkout</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container >
  );
};

export default Cart;