import React, { useEffect, useState } from 'react';
import { useProducts } from '../../contexts/ProductContextProvider';
import ProductCard from '../products/ProductCard';
import { useSearchParams } from 'react-router-dom';

// for pagiantion
import Pagination from '@mui/material/Pagination';

// for filtration
import FilterProduct from './FilterProduct';


const ProductsList = () => {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  // search logic
  // получаем запрос, который летит после основного юрл
  // console.log(window.location.search);
  // такая тема, юз сеарч парамс устанавливает значения поиска в адресную строку, сам хук возвращает объект с ключом поиска и тем что ищут, а также возвращает функцию для управления этим самым поиском соответственно
  const [searchParams, setSearchParams] = useSearchParams();

  // создали локальное состояние, начальное значение это то что было в поисковой строке, если такого нет, просто пустая строка
  const [search, setSearch] = useState(searchParams.get("q") || "");

  // этот юз эффект реагирует на изменение местного состояния(которое используется для связывания инпута), если состояние меняется, то он сражу же устанавливает значение в поисковую строку
  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search, ]);

  // а этот юз эффект уже смотрит непосредственно на сам поисковый запрос, если он меняется, то вызывается перерисовка всех продуктов, соответствуя условиям поиска(не забыть также изменить юрлку для поиска продуктов)
  useEffect(() => {
    getProducts();
    // НЕ ЗАБЫТЬ ПРИ ПАГИНАЦИИ!!!!!!!=======================
    // когда обновляются параметры поиска, мы устанавливаем страницу в начальное положение, так как исходные данные с сервера всегда приходят разные
    setPage(1);
  }, [searchParams, ]);

  // pagination HERE(возьмем готовый компонент из материал юай), обработаем кейс, когда нет пагинации на бэке, в этом случае будем реализовывать на фронте полностью всю пагинацию
  // состояние для самой страницы
  const [page, setPage] = useState(1);
  // сколько хотим продуктов на странице
  const itemsPerPage = 6;
  // подсчитываем сколько всего страниц будет, округляем при помощи модуля Math
  const count = Math.ceil(products.length / itemsPerPage);

  // функция, которая меняет состояние страницы(то есть повышает либо понижает)
  const handlePage = (e, p) => {
    // console.log(p);
    setPage(p);
  };

  // это текущий массив с продуктами, так как с сервера мы постоянно будем получать все продукты всегда, а уже здесь на фронте мы при помощи слайса берем столько сколько нужно
  function currentData() {
    // индекс откуда начать, страница - 1 умноженная на количество продуктов
    const begin = (page - 1) * itemsPerPage;
    // индекс до которого нужно брать(не включительно), берем начало и просто прибавляем количество, которое хотим видеть на странице
    const end = begin + itemsPerPage;
    // потом при помощи слайс просто берем из массива с продуктами нужно количество продуктов
    return products.slice(begin, end);
  }

  return (
    <div>
      {/* для фильтрации был создан отдельный компонент6 который был импортирован чуть выше */}
      <FilterProduct /> <br/>
      {/* инпут, который и будет служить строчкой для поиска, в данном случае он просто меняет местное состояние */}
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
      {products ? (
        // здесь после проверки на то, что сервер отправил продукты, мы просто вызываем функцию, которая возвращает массив с продуктами(который уже несет в себе продукты соответствуя количеству и странице)
          currentData().map((item) => <ProductCard item={item} key={item.id} />)
        ) : (
          <h3>Loading...</h3>
        )}
        {/* добавили компонент пагинации */}
      <Pagination count={count} page={page} onChange={handlePage} />
    </div>
  )
}

export default ProductsList