import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import Breadcums from '../Breadcums/Breadcums';
import CheckoutStep from '../Checkout/CheckoutStep';

const Shipping = () => {
  const { dispatch4, state3, state4, dispatch3 } = useContext(Store);
  const { shipping_info } = state4;
  const navigate = useNavigate();
  const [fullname, setFullname] = useState(shipping_info.fullname || "");
  const [phone, setPhone] = useState(shipping_info.phone || "");
  const [address, setAddress] = useState(shipping_info.address || "");
  const [postalcode, setPostalcode] = useState(shipping_info.postalcode || "");
  const [country, setCountry] = useState(shipping_info.country || "");
  const [city, setCity] = useState(shipping_info.city || "");


  const { userInfo } = state3;

  const handleSubmit = e => {
    e.preventDefault();
    dispatch4({
      type: 'SHIPPING_INFO',
      payload: {
        fullname,
        phone,
        address,
        postalcode,
        country,
        city
      }
    })
    localStorage.setItem('shipping_info', JSON.stringify({
      fullname,
      phone,
      address,
      postalcode,
      country,
      city
    }))
    navigate('/payment')
  }

  useEffect(() => {
    if (!userInfo) {
      dispatch3({ type: "USER_LOGOUT" });
      localStorage.removeItem('userInfo');
      navigate('/signin')
    }
  }, [])

  return (
    <Container>
      <Row className='justify-content-md-center my-4'>
        <Breadcums page={'Shipping'}></Breadcums>
        <CheckoutStep stepOne={true} stepTwo={true}></CheckoutStep>
        <Helmet>
          <title>Shipping Page</title>
        </Helmet>
        <Col md={6}>
          <Form className='border p-3 rounded' onSubmit={handleSubmit}>
            <Alert className='text-center'>
              User Shipping Information
            </Alert>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Full Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" value={postalcode} onChange={e => setPostalcode(e.target.value)} placeholder="Postal Code" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" />
            </Form.Group>
            <Button variant="dark" type="submit">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Shipping;