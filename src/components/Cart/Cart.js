import React, { useContext } from 'react';
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';

const Cart = () => {
  const { state, dispatch } = useContext(Store)
  const { cart: { cartItems } } = state;
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
                      <Row>
                        <Col lg={4}>
                          <img src={item.img} className='img-fluid' alt="" />
                          <Link to={`/cartproduct/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col lg={3}>
                          <Button disabled={item.quantity !== 1} variant='success'>-</Button>
                          <span className='mx-3'>{item.quantity}</span>
                          <Button disabled={item.quantity !== 1} variant='success'>+</Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
          }
        </Col>
      </Row>

    </Container>
  );
};

export default Cart;