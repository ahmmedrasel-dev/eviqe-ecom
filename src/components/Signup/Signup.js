import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import Breadcums from '../Breadcums/Breadcums';

const Signup = () => {
  const { search } = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const navigate = useNavigate();

  const { state3, dispatch3 } = useContext(Store);
  const { userInfo } = state3;
  // Getting Serch value from url
  let redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:8000/api/user/signup', {
        name,
        email,
        password
      });
      dispatch3({ type: 'USER_LOGIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    } catch (error) {
      toast.error('Does not match user Credential!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [])

  return (
    <Container className='mt-3'>
      <Breadcums page={'Signup'}></Breadcums>
      <Helmet>
        <title>Signup Page</title>
      </Helmet>
      <Row className='justify-content-md-center'>
        <Col md={6} className="border p-3 rounded">
          <Form onSubmit={handleSubmit}>
            <Alert className='text-center'>
              <h4>User Sign Up</h4>
            </Alert>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" onChange={e => setName(e.target.value)} placeholder="Enter Full Name" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" onChange={e => setcPassword(e.target.value)} placeholder="Confirm Password" />
            </Form.Group>

            <Button className='w-25' variant="primary" type="submit">
              Sign Up
            </Button>
            <br />
            <Form.Text className="text-muted">
              Already have an Account? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>.
            </Form.Text>
          </Form>
        </Col>
      </Row>

    </Container>
  );
};

export default Signup;