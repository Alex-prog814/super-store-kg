import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContextProvider';

const ProductDetails = () => {
  const { id } = useParams();

  const { getProductDetails, productDetails } =
    useProducts();

  useEffect(() => {
    getProductDetails(id);
  }, []);

  return (
    <>
    {productDetails ? (
      <div>
      <h3>{productDetails.name}</h3>
      <h3>{productDetails.desc}</h3>
      <h3>{productDetails.price}</h3>
      <img src={productDetails.picture} alt="" />
    </div>
    ) : (
      <h3>Loading...</h3>
    )}
    </>
  )
}

export default ProductDetails