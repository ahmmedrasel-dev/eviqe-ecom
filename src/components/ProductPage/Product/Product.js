import React from 'react';
import { Badge, Button, Card, Col } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { name, price, img, category, seller, slug, ratings, ratingsCount } = product;


  return (
    <Col md={3} className="my-5">
      <Card>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>
            <Link to={`/product/${slug}`}>{name}</Link>
          </Card.Title>
          <div>
            <ReactStars
              count={5}
              value={ratings}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            Total <Badge bg="secondary">{ratingsCount}</Badge> Rattings
          </div>
          <Card.Text>

            Category: {category}
            Seller: {seller}
            Price: {price}


          </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col >
  );
};

export default Product;