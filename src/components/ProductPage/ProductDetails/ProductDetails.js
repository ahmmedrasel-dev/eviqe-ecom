import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Badge, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import './productDetails.css';
import { RiShoppingCart2Fill } from "react-icons/ri";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload }
    case 'FETCH_FAILD':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}
const ProductDetails = () => {
  const { slug } = useParams();

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    product: {},
  });

  const { img, name, ratings, ratingsCount, stock, seller, price, description, category } = product;

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const product = await axios.get(`http://localhost:8000/product/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: product.data })

      } catch (error) {
        dispatch({ type: 'FETCH_FAILD', payload: error.message });
      }
    }
    getProduct()
  }, [])

  return (
    <Container className='mt-3'>
      {

        loading ? <div className='loader'>
          < Spinner animation="grow" />
        </div> :
          <Row>
            <Col md={6}>
              <div className='product-feature'>
                <img src={img} alt="" className='img-fluid rounded' />
              </div>
            </Col>
            <Col md={6}>
              <div className='product-details'>
                <h3 className='mb-3'>{name}</h3>

                <ReactStars
                  count={5}
                  value={ratings}
                  edit={false}
                  size={24}
                  activeColor="#ffd700"
                />

                <p> Total <Badge bg="secondary">{ratingsCount}</Badge> Rattings.</p>

                <p className='py-3'>{description}</p>

                <p>Stock: {stock > 0 ? <Badge bg="primary">{stock}</Badge> : <Badge bg="danger">{stock}</Badge>}</p>

                <p>Category: {category}</p>
                <p className='py-3'>Murchend: {seller}</p>
                <h3 className='mb-5'>Product Price: ${price}</h3>

                <p>
                  <Button variant="dark">Add To Cart <RiShoppingCart2Fill /></Button>
                </p>
              </div>
            </Col>

          </Row>
      }

    </Container >
  );
};

export default ProductDetails;