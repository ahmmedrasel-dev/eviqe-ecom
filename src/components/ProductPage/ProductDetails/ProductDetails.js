import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { slug } = useParams();
  return (
    <div>
      {slug}
    </div>
  );
};

export default ProductDetails;