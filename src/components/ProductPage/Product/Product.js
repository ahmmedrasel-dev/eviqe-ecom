import React, { useContext } from 'react';
import { Badge, Button, Card, Col } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Helmet } from 'react-helmet-async';
import { Store } from '../../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsHeart } from 'react-icons/bs';

const Product = ({ product }) => {
  const { name, price, img, category, seller, slug, ratings, ratingsCount, stock, _id } = product;

  const { state, dispatch: ctxDispatch, dispatch2 } = useContext(Store);

  const { cart } = state;
  const handleAddToCart = async id => {
    const existingItem = cart.cartItems.find(item => item._id === id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1

    const { data } = await axios.get(`http://localhost:8000/products/${id}`);

    if (data.stock < quantity) {

      toast.warn(`${name} out of stock!`)
      return;
    }
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...product, quantity: 1 },

    })
    toast.success('Product Add to Cart')
  }

  const handleWishlist = () => {

    dispatch2({
      type: 'ADD_WISHLIST_ITEM',
      payload: { ...product },

    })
    toast.success('Product Add to Wishlist!')
  }

  return (
    <Col md={3} className='mb-4'>
      <Helmet>
        <title>Prodct Page</title>
      </Helmet>
      <Card>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>
            <Link className='text-dark mb-2' to={`/product/${slug}`}>{name.length < 20 ? name : name.slice(0, 20) + '...'}</Link>

            <ReactStars
              className='mt-2'
              count={5}
              value={ratings}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />

            <p className='mt-2'>Total <Badge bg="secondary">{ratingsCount}</Badge> Rattings</p>
          </Card.Title>

          <Card.Text>

            <p> Category: {category}</p>
            <p>Seller: {seller}</p>
            <p> Price: {price}</p>
            <p> Stock: {stock}</p>


          </Card.Text>
          <div className='d-flex justify-content-between align-items-center'>
            {
              stock < 1 ?
                <Button disabled={stock === 0 && true} variant="danger">Out of Stock</Button>
                :
                <Button variant="dark" onClick={() => handleAddToCart(_id)}>Add to Cart <RiShoppingCart2Fill /></Button>
            }

            <Button variant="link" onClick={handleWishlist}><BsHeart /></Button>
          </div>

        </Card.Body>
      </Card>
    </Col >
  );
};

export default Product;