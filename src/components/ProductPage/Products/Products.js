import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import Product from '../Product/Product';
import './products.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAILD':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}
const Products = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    products: [],
  })


  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const products = await axios.get('http://localhost:8000/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: products.data })

      } catch (error) {
        dispatch({ type: 'FETCH_FAILD', payload: error.message })
      }
    }
    getProduct();
  }, [])

  return (
    <>
      <Container>
        <Row>
          {
            loading ? <div className='loader'>
              <Spinner animation="grow" />
            </div>
              :
              products.map((item, index) => <Product
                key={index}
                product={item}
              ></Product>)
          }
        </Row>
      </Container>
    </>
  );

};

export default Products;