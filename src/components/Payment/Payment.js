import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import Breadcums from '../Breadcums/Breadcums';
import CheckoutStep from '../Checkout/CheckoutStep';

const Payment = () => {
  const navigate = useNavigate();
  const { dispatch5, state5, dispatch3, state3 } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState(state5.paymentMethod);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch5({ type: "PAYMENT_METHOD", payload: paymentMethod })
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    navigate('/placeorder');
  }

  useEffect(() => {
    if (!state3.userInfo) {
      dispatch3({ type: "USER_LOGOUT" });
      localStorage.removeItem('userInfo');
      navigate('/signin')
    }
  }, [])

  return (
    <Container>
      <Row className='justify-content-md-center my-4'>
        <Breadcums page={'Payment Page'}></Breadcums>
        <CheckoutStep stepOne={true} stepTwo={true} stepThree={true}></CheckoutStep>
        <Helmet>
          <title>Shipping Page</title>
        </Helmet>
        <Col md={4} className="border p-3 mt-3 rounded ">
          <Form onSubmit={handleSubmit}>
            <Alert className='text-center'>
              <h4>Choose Payment Method</h4>
            </Alert>
            <Form.Check
              className="mb-3"
              type="radio"
              value="paypal"
              label="Paypal"
              id="Paypal"
              checked={paymentMethod === 'paypal'}
              onChange={e => setPaymentMethod(e.target.value)}
            />

            <Form.Check
              className="mb-3"
              type="radio"
              value="strip"
              label="Strip"
              id="strip"
              checked={paymentMethod === 'strip'}
              onChange={e => setPaymentMethod(e.target.value)}
            />

            <Form.Check
              className="mb-3"
              type="radio"
              value="ssl_ecom"
              label="SSL Ecommerce"
              id="ssl_ecom"
              checked={paymentMethod === 'ssl_ecom'}
              onChange={e => setPaymentMethod(e.target.value)}
            />


            <Button className='me-2' variant="dark" type="submit">
              Continue
            </Button>

            <Link to="/shipping"><Button variant="warning" type="submit">
              Back to Shipping
            </Button></Link>
          </Form>
        </Col>
      </Row>




    </Container>
  );
};

export default Payment;