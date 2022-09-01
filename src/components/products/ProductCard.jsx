import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContextProvider';
// for cart
import { useCart } from '../../contexts/CartContextProvider';

const ProductCard = ({ item }) => {
  const { deleteProduct } = useProducts();

  const navigate = useNavigate();

  // for cart
  const { addProductToCart, checkProductInCart } = useCart();

  return (
    <div>{item.name} {item.price}
    <button onClick={() => navigate(`/details/${item.id}`)}>Detail</button> 
    <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
    <button onClick={() => deleteProduct(item.id)}>Delete</button>

    {/* for cart */}
    <button onClick={() => addProductToCart(item)}>Add To Cart</button>
    </div>
  )
}

export default ProductCard