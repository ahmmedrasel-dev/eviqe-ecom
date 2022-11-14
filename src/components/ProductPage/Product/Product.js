import React from 'react';
import { Badge, Button, Card, Col } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { RiShoppingCart2Fill } from "react-icons/ri";
import { Helmet } from 'react-helmet-async';

const Product = ({ product }) => {
  const { name, price, img, category, seller, slug, ratings, ratingsCount } = product;


  return (
    <Col md={3} className="my-5">
      <Helmet>
        <title>Prodct Page</title>
      </Helmet>
      <Card>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>
            <Link to={`/product/${slug}`}>{name.length < 20 ? name : name.slice(0, 20) + '...'}</Link>
          </Card.Title>

          <Card.Text>

            <p> Category: {category}</p>
            <p>Seller: {seller}</p>
            <p> Price: {price}</p>

            <p>Total <Badge bg="secondary">{ratingsCount}</Badge> Rattings</p>
          </Card.Text>
          <div className='d-flex justify-content-between'>
            <Button variant="primary">Add to Cart <RiShoppingCart2Fill /></Button>
            <ReactStars
              count={5}
              value={ratings}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />

          </div>

        </Card.Body>
      </Card>
    </Col >
  );
};

export default Product;