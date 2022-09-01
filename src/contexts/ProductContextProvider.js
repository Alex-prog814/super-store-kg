import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ACTIONS, JSON_API_PRODUCTS } from "../helpers/consts";

export const productContext = createContext();

export const useProducts = () => useContext(productContext);

const INIT_STATE = {
  products: [],
  productDetails: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, products: action.payload };
    case ACTIONS.GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    const navigate = useNavigate();
    // для фильтрации по категориям
    const location = useLocation();

    // add products
    const addProduct = async (newProduct) => {
        await axios.post(JSON_API_PRODUCTS, newProduct);
        // getProducts();
    };

    // get all products
    const getProducts = async () => {
        const { data } = await axios(
            `${JSON_API_PRODUCTS}/${window.location.search}`
        );
        // const { data } = await axios(
        //   `${JSON_API_PRODUCTS}`
        // );

        dispatch({
            type: ACTIONS.GET_PRODUCTS,
            payload: data,
        });
    };

    // delete product
    const deleteProduct = async (id) => {
        await axios.delete(`${JSON_API_PRODUCTS}/${id}`);
        getProducts();
    };

    // edit product
    const getProductDetails = async (id) => {
        const { data } = await axios(`${JSON_API_PRODUCTS}/${id}`);
        dispatch({
          type: ACTIONS.GET_PRODUCT_DETAILS,
          payload: data,
        });
    };
    
    const saveEditedProduct = async (newProduct) => {
        await axios.patch(`${JSON_API_PRODUCTS}/${newProduct.id}`, newProduct);
        getProducts();
    };

    // фильтрация по категориям(по типу)
    const fetchByParams = (query, value) => {
      // поставили изначальное значение, это наши параметры поиска(которые уже были или нет)
      const search = new URLSearchParams(location.search);
  
      // если прилетает значение все категории товаров
      if (value === "all") {
        // то мы просто из строки убираем наш запрос(на фильтрацию)
        search.delete(query);
      } else {
        // в противном случае, наоборот добавляем в строку запроса параметр для фильтрации
        search.set(query, value);
      }
      // создаем новый юрл, при помощи юз локатион берем фактический путь и добавляем в него параметры запроса
      const url = `${location.pathname}?${search.toString()}`;
      // а потом просто переходим на этот путь
      navigate(url);
    };

    // просто вынесли все валуес в отдельную переменную, в объект, чтобы было проще использовать
    const values = {
    getProducts,
    addProduct,
    deleteProduct,
    getProductDetails,
    saveEditedProduct,
    fetchByParams,

    products: state.products,
    productDetails: state.productDetails,
  };

  return (
    //   здесь просто передаем все валуес и все
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
