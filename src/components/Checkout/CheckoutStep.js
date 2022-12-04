import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './checkoutStep.css';

const CheckoutStep = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Container>

      <Row className='mx-5 my-3'>
        <Col>
          <h4 className={stepOne ? 'stepComplete' : ''}>Sign In</h4>
        </Col>
        <Col>
          <h4 className={stepTwo ? 'stepComplete' : ''}>Shipping Information</h4>
        </Col>
        <Col>
          <h4 className={stepThree ? 'stepComplete' : ''}>Payment</h4>
        </Col>
        <Col>
          <h4 className={stepFour ? 'stepComplete' : ''}>Placeorder</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutStep;