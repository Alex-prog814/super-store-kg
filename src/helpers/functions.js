// функция, которая смотрит на локал стораже и говорит, сколько там продуктов, либо возвращает 0, если там пусто
export function getCountProductsInCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart.products.length : 0;
}
  
// функция, которая поможет в последующем подсчитать цену для каждого продукта отдельно
export const calcSubPrice = (product) => +product.count * product.item.price;

// функция помогающая рассчитать, сколько всего денег за продукты выйдет в итоге, редьюс вторым аргументом принимает начальное состояние и уже к нему прибавляет все остальное
export const calcTotalPrice = (products) => {
    return products.reduce((pV, cur) => {
        return (pV += cur.subPrice);
    }, 0);
};