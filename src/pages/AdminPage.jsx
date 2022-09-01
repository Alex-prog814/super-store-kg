import React from 'react';
import AddProduct from '../components/products/AddProduct';
import '../styles/AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page__block">
      <div className="add-product__left">
        <h2>Admin Panel</h2>
        <h3>If you are not an admin, please leave!</h3>
      </div>
      <div className="add-product__right">
        <AddProduct />
      </div>
    </div>
  )
}

export default AdminPage