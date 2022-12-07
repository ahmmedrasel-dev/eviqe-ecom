import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import Breadcums from '../Breadcums/Breadcums';
import CheckoutStep from '../Checkout/CheckoutStep';

const Placeorder = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state4, dispatch4, state3, dispatch3, state5 } = useContext(Store);

  const { shipping_info } = state4;

  const [fullname, setFullname] = useState(shipping_info.fullname || "");
  const [phone, setPhone] = useState(shipping_info.phone || "");
  const [address, setAddress] = useState(shipping_info.address || "");
  const [postalcode, setPostalcode] = useState(shipping_info.postalcode || "");
  const [country, setCountry] = useState(shipping_info.country || "");
  const [city, setCity] = useState(shipping_info.city || "");
  const navigate = useNavigate();
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
    setShow(false)
    // navigate('/payment')
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
      <Row className='my-4'>
        <Breadcums page={'Place order'}></Breadcums>
        <CheckoutStep stepOne={true} stepTwo={true} stepThree={true} stepFour={true}></CheckoutStep>
        <Helmet>
          <title>Placeorder</title>
        </Helmet>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Shipping Information</Card.Title>
              <hr />
              <Card.Text>
                <strong>Full Name: </strong>{shipping_info.fullname} <br />
                <strong>Phone Number: </strong>{shipping_info.phone} <br />
                <strong>Address: </strong>{shipping_info.address} <br />
                <strong>Postal Code: </strong>{shipping_info.postalcode} <br />
                <strong>City: </strong>{shipping_info.city} <br />
                <strong>Country: </strong>{shipping_info.country} <br />
              </Card.Text>
              <hr />
              <Card.Title>Selected Payment</Card.Title>
              <hr />

              <Card.Text>
                <strong>Payment Method: </strong>{state5.paymentMethod.toUpperCase()} <br />
              </Card.Text>
              <Button variant="dark" className='me-3' onClick={handleShow}>Edit</Button>
              <Link to="/payment"><Button variant="warning">Edit Payment</Button></Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Shipping Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='border p-3 rounded'>
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

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Placeorder;