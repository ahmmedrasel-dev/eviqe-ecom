import React from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Login = () => {
  const { search } = useLocation();
  // Getting Serch value from url
  let redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';
  return (
    <Container className='w-25 border p-3 mt-5 rounded'>
      <Form>
        <Alert className='text-center'>
          Login
        </Alert>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button className='w-25' variant="primary" type="submit">
          Login
        </Button>
        <br />
        <Form.Text className="text-muted">
          Don't have an Account? <Link to={`/signup?redirect=${redirect}`}>Create Account</Link>.
        </Form.Text>
      </Form>
    </Container>
  );
};

export default Login;