import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Button, Card, Col, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import Breadcums from '../Breadcums/Breadcums';
import CheckoutStep from '../Checkout/CheckoutStep';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true }
    case 'CREATE_SUCCESS':
      return { ...state, loading: false }
    case 'CREATE_FAIL':
      return { ...state, loading: false }
    default:
      return state;
  }
}

const Placeorder = () => {

  const [{ loading, error }, orderDispatch] = useReducer(reducer, {
    loading: false,
    error: ''
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state4, dispatch4, state3, dispatch3, state5, state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;
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

  let totalPrice = cartItems.reduce((accomolator, current) => accomolator + current.price * current.quantity, 0);
  let tax = totalPrice < 500 ? 0 : (totalPrice * 7) / 100;

  const handleOrder = async () => {
    try {
      const { data } = await axios.post('http://localhost:8000/api/order', {
        orderItems: cartItems,
        shippingAddress: shipping_info,
        paymentMethod: state5.paymentMethod,
        productPrice: totalPrice,
        tax: tax,
        shippingPrice: 0,
        totalPrice: totalPrice + tax,
      }, {
        headers: {
          authorization: `Bearer ${state3.userInfo.token}`
        }
      });
      dispatch({ type: 'CLEAR_CART' });
      orderDispatch({ type: 'CREATE_SUCCESS' })
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      orderDispatch({ type: "CREATE_FAIL" })
      toast.error(err);
    }
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
        <Col md={8}>
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
              <Button variant="dark" className='me-3' onClick={handleShow}>Edit Shipping</Button>

            </Card.Body>
          </Card>

          <Card className='mt-3'>
            <Card.Body>
              <Card.Title>Cart Items:</Card.Title>
              <hr />
              <Card.Text>
                {
                  cartItems &&
                  <ListGroup>
                    {
                      cartItems.map(item => (
                        <ListGroup.Item>

                          <Row className='align-items-center'>
                            <Col lg={1}>
                              <img src={item.img} width="80px" className='rounded' alt="" />
                            </Col>

                            <Col lg={6}>
                              <Link to={`/cartproduct/${item._id}`} className="mx-5">{item.name.slice(0, 15)}</Link>
                            </Col>

                            <Col lg={3}>
                              <Button disabled={item.quantity == 1} variant='success' onClick={() => handleQty(item, item.quantity - 1)}>-</Button>
                              <span className='mx-3'>{item.quantity}</span>
                              <Button disabled={item.quantity === item.stock} variant='success' onClick={() => handleQty(item, item.quantity + 1)}>+</Button>

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
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Selected Payment</Card.Title>
              <hr />
              <Card.Text>
                <strong>Payment Method: </strong>{state5.paymentMethod.toUpperCase()} <br />
              </Card.Text>
              <hr />
              <Link to="/payment"><Button variant="warning">Edit Payment</Button></Link>

              <hr />
              <Card.Title>
                <Card.Title>Payment Summary:</Card.Title>
              </Card.Title>
              <hr />
              <Card.Text>
                <ListGroup>
                  <ListGroup.Item> Product Price: ${totalPrice}</ListGroup.Item>
                  <ListGroup.Item> Shipping Cost: $0</ListGroup.Item>
                  <ListGroup.Item> Tax: ${tax}</ListGroup.Item>
                  <ListGroup.Item> Total Amount: ${totalPrice + tax}</ListGroup.Item>
                </ListGroup>
              </Card.Text>

              <Button variant='dark' onClick={handleOrder}>Place Order</Button>
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