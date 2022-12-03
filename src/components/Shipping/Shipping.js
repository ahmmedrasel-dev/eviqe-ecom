import React, { useContext, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import Breadcums from '../Breadcums/Breadcums';

const Shipping = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const { state4, dispatch4 } = useContext(Store);

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
  return (
    <>
      <Container className=''>
        <Row className='justify-content-md-center my-4'>
          <Breadcums page={'Shipping'}></Breadcums>
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
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Shipping;