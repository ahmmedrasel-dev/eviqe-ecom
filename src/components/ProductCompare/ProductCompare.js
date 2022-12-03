import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Badge, Button, Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import InnerImageZoom from 'react-inner-image-zoom';
import ReactStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import Breadcums from '../Breadcums/Breadcums';
import './productCompare.css'


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload }
    case 'FETCH_FAILD':
      return { ...state, loading: false, error: action.payload }
    default:
      return state;
  }
}

const ProductCompare = () => {
  const [singleProduct, setSingleProduct] = useState('');
  const [singleProductTwo, setSingleProductTwo] = useState('');
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    products: [],
  });


  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const { data } = await axios.get('http://localhost:8000/api/products');

        dispatch({ type: 'FETCH_SUCCESS', payload: data })

      } catch (error) {
        dispatch({ type: 'FETCH_FAILD', payload: error.message })
      }
    }
    getProduct();
  }, [])

  const getProductOne = async (slug) => {
    const { data } = await axios.get(`http://localhost:8000/api/products/${slug}`);
    setSingleProduct(data)
  }

  const getProductTwo = async (slug) => {
    const { data } = await axios.get(`http://localhost:8000/api/products/${slug}`);
    setSingleProductTwo(data)
  }

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart: { cartItems } } = state;

  const handleAddToCart = async (slug) => {
    const newProduct = products.find(item => item.slug === slug);
    const existingItem = cartItems.find(item => item.slug === slug);
    const quantity = existingItem ? existingItem.quantity + 1 : 1

    const { data } = await axios.get(`http://localhost:8000/api/products/${slug}`);


    if (data.stock < quantity) {
      alert(`${data.name} out of stock!`)
      return;
    }

    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...newProduct, quantity: 1 }
    })
    toast.success('Product Add to Cart!')
  }

  return (
    <Container>
      <Helmet>
        <title>Product Compare</title>
      </Helmet>
      {
        loading ?
          <div className='loader'>
            <Spinner animation="grow" />
          </div>
          :
          <Row className='my-3'>
            <Breadcums page={'product-compare'}></Breadcums>
            <Col md={6}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                  Choose Product One
                </Dropdown.Toggle>

                <Dropdown.Menu>

                  {
                    loading ? <div className='loader'>
                      <Spinner animation="grow" />
                    </div>
                      :
                      products.map(item => (
                        <Dropdown.Item onClick={() => getProductOne(item.slug)}>
                          <img src={item.img} className="comImg" alt="" />
                          {item.name}
                        </Dropdown.Item>
                      ))
                  }

                </Dropdown.Menu>
              </Dropdown>


              <Row className="mt-5">
                {singleProduct ?
                  <>
                    <Col md={6}>
                      <div className='product-feature'>
                        <InnerImageZoom src={singleProduct.img} className='img-fluid rounded' zoomSrc={singleProduct.img} />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className='product-details'>
                        <h5>{singleProduct.name}</h5>

                        <ReactStars
                          count={5}
                          value={singleProduct.ratings}
                          edit={false}
                          size={24}
                          activeColor="#ffd700"
                        />

                        <p> Total <Badge bg="secondary">{singleProduct.ratingsCount}</Badge> Rattings.</p>

                        <p>Stock: {singleProduct.stock > 0 ? <Badge bg="primary">{singleProduct.stock}</Badge> : <Badge bg="danger">{singleProduct.stock}</Badge>}</p>

                        <p>Category: {singleProduct.category}</p>
                        <p className='py-1'>Brand: {singleProduct.brand}</p>
                        <p>Product Price: ${singleProduct.price}</p>

                        {
                          singleProduct.stock < 1 ?
                            <Button disabled={singleProduct.stock === 0 && true} variant="danger">Out of Stock</Button>
                            :
                            <Button variant="dark" onClick={() => handleAddToCart(singleProduct.slug)}>Add to Cart <RiShoppingCart2Fill /></Button>
                        }
                      </div>
                    </Col>
                  </>
                  :
                  <h3>Choose A Product</h3>
                }
              </Row>




            </Col>


            <Col md={6}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                  Choose Product Two
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {
                    loading ? <div className='loader'>
                      <Spinner animation="grow" />
                    </div>
                      :
                      products.map(item => (
                        <Dropdown.Item onClick={() => getProductTwo(item.slug)}>
                          <img src={item.img} className="comImg" alt="" />
                          {item.name}
                        </Dropdown.Item>
                      ))
                  }

                </Dropdown.Menu>
                <Row className="mt-5">
                  {
                    singleProductTwo ?
                      <>
                        <Col md={6}>
                          <div className='product-feature'>
                            <InnerImageZoom src={singleProductTwo.img} className='img-fluid rounded' zoomSrc={singleProductTwo.img} />
                          </div>
                        </Col>

                        <Col md={6}>
                          <div className='product-details'>
                            <h5>{singleProductTwo.name}</h5>

                            <ReactStars
                              count={5}
                              value={singleProductTwo.ratings}
                              edit={false}
                              size={24}
                              activeColor="#ffd700"
                            />

                            <p> Total <Badge bg="secondary">{singleProductTwo.ratingsCount}</Badge> Rattings.</p>

                            <p>Stock: {singleProductTwo.stock > 0 ? <Badge bg="primary">{singleProductTwo.stock}</Badge> : <Badge bg="danger">{singleProductTwo.stock}</Badge>}</p>

                            <p>Category: {singleProductTwo.category}</p>
                            <p className='py-1'>Brand: {singleProductTwo.brand}</p>
                            <p>Product Price: ${singleProductTwo.price}</p>


                            {
                              singleProductTwo.stock < 1 ?
                                <Button disabled={singleProductTwo.stock === 0 && true} variant="danger">Out of Stock</Button>
                                :
                                <Button variant="dark" onClick={() => handleAddToCart(singleProductTwo.slug)}>Add to Cart <RiShoppingCart2Fill /></Button>
                            }
                          </div>
                        </Col>
                      </>
                      :
                      <h3>Choose A Product</h3>
                  }
                </Row>
              </Dropdown>
            </Col>
          </Row>
      }
    </Container>
  );
};

export default ProductCompare;