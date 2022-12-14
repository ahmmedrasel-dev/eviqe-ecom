import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Alert, Badge, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import './productDetails.css';
import { RiShoppingCart2Fill } from "react-icons/ri";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet } from 'react-helmet-async';
import { Store } from '../../../Store';
import Breadcums from '../../Breadcums/Breadcums';
import { toast } from 'react-toastify';

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
  const [relatedProduct, setRelatedProduct] = useState([]);

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    product: {},
  });

  const { img, name, ratings, ratingsCount, stock, brand, price, description, category } = product;

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const product = await axios.get(`http://localhost:8000/api/products/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: product.data })

        const { data } = await axios.get(`http://localhost:8000/api/products`);

        const related = data.filter(item => item.category === product.data.category);
        setRelatedProduct(related);

      } catch (error) {
        dispatch({ type: 'FETCH_FAILD', payload: error.message });
      }
    }
    getProduct()
  }, [slug])



  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart } = state;
  const handleAddToCart = async () => {
    const existingItem = cart.cartItems.find(item => item._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1

    const { data } = await axios.get(`http://localhost:8000/api/products/${product._id}`);


    if (data.stock < quantity) {
      alert(`${product.name} out of stock!`)
      return;
    }
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...product, quantity: 1 }
    })
    toast.success('Product Add to Cart!')
  }

  return (
    <Container>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      {
        loading ?
          <div className='loader'>
            < Spinner animation="grow" />
          </div> :
          <>
            <Row className="my-3">
              <Breadcums page={slug}></Breadcums>
              <Col md={6}>
                <div className='product-feature'>
                  <InnerImageZoom src={img} className='img-fluid rounded' zoomSrc={img} />
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
                  <p className='py-3'>Brand: {brand}</p>
                  <h3 className='mb-5'>Product Price: ${price}</h3>

                  <p>
                    <Button variant="dark" onClick={handleAddToCart}>Add To Cart <RiShoppingCart2Fill /></Button>
                  </p>
                </div>
              </Col>

            </Row>

            <Row>
              <h2>Related Product</h2>
              {
                relatedProduct.length > 0 ?
                  relatedProduct.map(item => (
                    <Col md={3}>
                      {item.name}
                    </Col>
                  ))
                  :
                  <Alert>No Related Product Found!</Alert>

              }

            </Row>
          </>
      }

    </Container >
  );
};

export default ProductDetails;