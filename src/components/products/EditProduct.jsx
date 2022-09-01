import React, { useState, useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContextProvider';
import { useNavigate, useParams } from 'react-router-dom';


const EditProduct = () => {
  const { getProductDetails, productDetails, saveEditedProduct } =
    useProducts();

  const [product, setProduct] = useState(productDetails);
  

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setProduct(productDetails);
  }, [productDetails, ]);

  useEffect(() => {
    getProductDetails(id);
  }, []);

  console.log(productDetails);

  const handleInp = (e) => {
    if (e.target.name === "price") {
      let obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };
      setProduct(obj);
    } else {
      let obj = {
        ...product,
        [e.target.name]: e.target.value,
      };
      setProduct(obj);
    }
  };

  return (
    <>
      {product ? (
        <div>
          <input type="text" value={product.name} placeholder="Name" name="name" onChange={handleInp} />
          <input type="text" value={product.description} placeholder="Description" name="description" onChange={handleInp} />
          <input type="text" value={product.price} placeholder="Price" name="price" onChange={handleInp} />
          <input type="text" value={product.picture} placeholder="Picture" name="picture" onChange={handleInp} />
          <input type="text" value={product.type} placeholder="Type" name="type" onChange={handleInp} />
          <button onClick={() => {
            saveEditedProduct(product);
            navigate("/products");
          }}>Save Changes</button>
        </div>
      ):<h1>...loading...</h1>}
    </>
  )
}

export default EditProduct