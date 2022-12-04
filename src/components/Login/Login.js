import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './login.css';
import { Store } from '../../Store';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Getting Serch value from url
  let redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const { dispatch3, state3 } = useContext(Store);
  const { userInfo } = state3;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8000/api/user/signin', {
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
    <Container className='w-25 border p-3 rounded login-form'>
      <Form onSubmit={handleSubmit}>
        <Alert className='text-center'>
          <h4>User Login</h4>
        </Alert>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
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