import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductContextProvider';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles'; 
import '../../styles/AddProduct.css';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'grey',
  '&:hover': {
    backgroundColor: '#121212',
  },
}));

const AddProduct = () => {
  const { addProduct } = useProducts();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    picture: "",
    type: "",
  });

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
    <div className="add-product__form">
      <Box sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        className="box-add-product">
      <h2>Add product</h2>
      <TextField
      className="add-product__input"
      id="outlined-name-input"
      label="Name"
      type="text"
      name="name"
      onChange={handleInp}
      /><br />
      <TextField
      id="outlined-description-input"
      label="Description"
      type="text"
      name="description"
      onChange={handleInp}
      /><br />
      <TextField
      id="outlined-price-input"
      label="Price"
      type="text"
      name="price"
      onChange={handleInp}
      /><br />
      <TextField
      id="outlined-picture-input"
      label="Picture"
      type="text"
      name="picture"
      onChange={handleInp}
      /><br />
      <TextField
      id="outlined-type-input"
      label="Type"
      type="text"
      name="type"
      onChange={handleInp}
      /><br />
      <ColorButton onClick={() => {
        addProduct(product);
        navigate('/products');
      }} variant="contained">Save</ColorButton>
      </Box>
    </div>
  )
}

export default AddProduct