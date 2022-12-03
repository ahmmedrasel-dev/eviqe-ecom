import axios from 'axios';
import React, { useContext } from 'react';
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import Breadcums from '../Breadcums/Breadcums';

const Wishlist = () => {
  const { state2, dispatch2, state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;
  const { wishlist: { wishlistItems } } = state2;

  const handleAddToCart = async product => {
    const existingItem = cartItems.find(item => item._id === product.id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1

    const { data } = await axios.get(`http://localhost:8000/api/products/${product.id}`);

    if (data.stock < quantity) {

      toast.warn(`${product.name} out of stock!`)
      return;
    }
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...product, quantity: 1 },

    })
    toast.success('Product Add to Cart')
  }

  const handleRemoveItem = (item) => {
    dispatch2({
      type: 'REMOVE_WISHLIST_ITEM',
      payload: item
    })
  }
  return (
    <Container>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <Row className='mt-3'>
        <Breadcums page={'wishlist'}></Breadcums>
        <Col lg={12}>
          {
            wishlistItems.length === 0 ?
              <Alert variant='danger'>
                Wishlist is empty!
              </Alert>
              :

              <ListGroup>
                {
                  wishlistItems.map(item => (
                    <ListGroup.Item>

                      <Row className='align-items-center'>
                        <Col lg={1}>
                          <img src={item.img} width="80px" className='rounded' alt="" />
                        </Col>

                        <Col lg={4}>
                          <Link to={`/cartproduct/${item._id}`} className="mx-5">{item.name}</Link>
                        </Col>

                        <Col lg={2}>
                          <h4>Stock: {item.stock}</h4>
                        </Col>

                        <Col lg={3}>
                          <h4>Price: ${item.price}</h4>
                        </Col>

                        <Col lg={2}>
                          <Button variant='danger' onClick={() => handleRemoveItem(item)}><FiTrash2 /></Button>
                          <Button variant='dark' className='ms-2' onClick={() => handleAddToCart(item)}><FiShoppingCart /></Button>
                        </Col>

                      </Row>
                    </ListGroup.Item>
                  ))
                }
              </ListGroup>
          }
        </Col>
      </Row>

    </Container >
  );
};

export default Wishlist;