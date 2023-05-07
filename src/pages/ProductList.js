import { useState, useEffect } from "react";
import ProductItems from "./ProductItems";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
      .then((response) => response.json())
      .then((data) => setProducts(data.meals));
  }, []);

  return (
    <section className="productList">
      {products.map((product) => {
        return (
          <ProductItems
            key={product.idMeal}
            idMeal={product.idMeal}
            strMeal={product.strMeal}
            strMealThumb={product.strMealThumb}
          />
        );
      })}
    </section>
  );
};

export default ProductList;
