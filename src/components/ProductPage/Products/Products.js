import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '../Product/Product';

const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      await fetch('http://localhost:8000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }
    getProduct();
  }, [])

  return (
    <>
      <Container>
        <Row>
          {
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