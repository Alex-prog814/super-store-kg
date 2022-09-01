import React from 'react';
import AuthContextProvider from './contexts/AuthContextProvider';
import ProductContextProvider from './contexts/ProductContextProvider';
import CartContextProvider from './contexts/CartContextProvider';
import Navbar from './components/Navbar/Navbar';
import MainRoutes from './MainRoutes';


function App() {
    return (
    <>
        <CartContextProvider>
            <ProductContextProvider>
                <AuthContextProvider>
                    <Navbar />
                    <MainRoutes />    
                </AuthContextProvider>
            </ProductContextProvider>
        </CartContextProvider>
    </>
    )
};

export default App;