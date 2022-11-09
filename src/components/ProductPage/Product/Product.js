import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { name, price, img, category, seller, slug } = product;
  return (
    <Col md={3} className="my-5">
      <Card>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>
            <Link to={`/product/${slug}`}>{name}</Link>
          </Card.Title>
          <Card.Text>
            <p>Category: {category}</p>
            <p>Seller: {seller}</p>
            <p>Price: {price}</p>
          </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col >
  );
};

export default Product;