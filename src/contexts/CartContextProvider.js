import React, { createContext, useContext, useReducer } from "react";
import { CART } from "../helpers/consts";
import { calcSubPrice, calcTotalPrice, getCountProductsInCart } from "../helpers/functions";

// создали контекст
const cartContext = createContext();

// по такой же системе как обычно, сделали кастомный хук, который помогает нам сразу получать объект контекста
export const useCart = () => {
  return useContext(cartContext);
};

// создали начальное состояние, в первом случае просто обратились к локал стораже и вытащили все что относится к корзине, во втором случае просто сохранили количество продуктов в корзине
const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart")),
  cartLength: getCountProductsInCart(),
};

// стандартный редьюсер
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case CART.GET_CART:
      return { ...state, cart: action.payload };
    case CART.GET_CART_LENGTH:
      return { ...state, cartLength: action.payload };
    default:
      return state;
  }
}

// обычный компонент
const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    // функция для получения данных о корзине
    const getCart = () => {
        // получаем
        let cart = JSON.parse(localStorage.getItem("cart"));

        // если данных нет
        if (!cart) {
            // установим в локал стораже корзину
            localStorage.setItem(
                "cart",
                JSON.stringify({ products: [], totalPrice: 0 })
            );

            // изменили переменную, теперь там просто объект с данными(но пока по сути пустой)
            cart = {
                products: [],
                totalPrice: 0,
            };
        }

        // обновили состояние
        dispatch({
            type: CART.GET_CART,
            payload: cart,
        });
    };

    // положить продукт в корзину, принимаем сам продукт, который должны отправить в корзину
    const addProductToCart = (product) => {
        // получили данные о корзине
        let cart = JSON.parse(localStorage.getItem("cart"));
    
        // проверили, ели нет, то устанавливаем объект в переменную
        if (!cart) {
          cart = {
            products: [],
            totalPrice: 0,
          };
        }
    
        // теперь собираем сам продукт(в последующем сам элемент корзины)
        let newProduct = {
          // айтем это сам продукт со всеми его данными
          item: product,
          // количество продукта к покупке, по умолчанию 1
          count: 1,
          //  цена за единицу товара, по сути изначальная цен апродукта и есть
          subPrice: +product.price,
        };
    
        // пытаемся найти элемент в корзине(для последующей проверки, чтобы при нажатии на кнопку, мы добавили продукт, а при повторном нажатии наоборот удалили)
        let productToFind = cart.products.filter(
          (elem) => elem.item.id === product.id
        );

        // если не найдется элемент в localStorage, то он добавит элемент в localStorage,а если найдет, то удалит
        if (productToFind.length === 0) {
          cart.products.push(newProduct);
        } else {
          cart.products = cart.products.filter(
            (elem) => elem.item.id !== product.id
          );
        }
    
        // обновили общую стоимость в корзине
        cart.totalPrice = calcTotalPrice(cart.products);
    
        // после всех изменений обновили или установили данные в локал стораже
        localStorage.setItem("cart", JSON.stringify(cart));
    
        // а также обновили состояние
        dispatch({
          type: CART.GET_CART,
          payload: cart,
        });
    };

    // удаление продукта из корзины, принимаем айди продукта, который хотим удалить
    function deleteProductInCart(id) {
        // получили данные
        let cart = JSON.parse(localStorage.getItem("cart"));
    
        // оставили только те продукты, у которых отличаются айди
        cart.products = cart.products.filter((elem) => elem.item.id !== id);
        // пересчитали заново общую стоимость
        cart.totalPrice = calcTotalPrice(cart.products);
        // установили данные в локал стораже
        localStorage.setItem("cart", JSON.stringify(cart));
    
        // вызвали функцию, которая обновит состояние продуктов из корзины
        getCart();

        // обновили количество продуктов
        dispatch({
          type: CART.GET_CART_LENGTH,
          payload: cart,
        });
    }

    // изменение количества одного продукта в корзине, принимаем количество продукта и его айди
    const changeProductCount = (count, id) => {
        // получаем данные со стораже
        let cart = JSON.parse(localStorage.getItem("cart"));
        // теперь перебираем все продукты и смотрим, если айди совпадает, то мы просто меняем количество
        cart.products = cart.products.map((product) => {
          if (product.item.id === id) {
            product.count = count;
            // и пересчитываем местную стоимость
            product.subPrice = calcSubPrice(product);
          }
          return product;
        });
        // теперь пересчитываем всю стоимость корзины
        cart.totalPrice = calcTotalPrice(cart.products);
        // обновим стораже
        localStorage.setItem("cart", JSON.stringify(cart));
        // обновим состояние
        dispatch({
          type: CART.GET_CART,
          payload: cart,
        });
    };

    // проверка на то, есть ли продукт в корзине или нет(в последующем сможем использовать для подсветки стилей(фона кнопки, к примеру))
    // принимаем айди
    function checkProductInCart(id) {
        // получили данные
        let cart = JSON.parse(localStorage.getItem("cart"));
    
        // если корзина не пустая, то мы проверим, лежит ли именно этот продукт там, и вернем либо тру либо фоллс
        if (cart) {
          let newCart = cart.products.filter((elem) => elem.item.id === id);
          return newCart.length > 0 ? true : false;
        } else {
          cart = {
            product: [],
            totalPrice: 0,
          };
        };
    };

    const values = {
        getCart,
        addProductToCart,
        changeProductCount,
        checkProductInCart,
        deleteProductInCart,
        cart: state.cart,
    };
    
    return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
// не забудем обернуть дочерние компоненты в контекст
