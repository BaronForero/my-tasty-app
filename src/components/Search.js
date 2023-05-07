import { useEffect, useState } from "react";
import ProductItems from "../pages/ProductItems";
import { AiFillCloseCircle } from "react-icons/ai";
import Logo from "../resource/Nav.png";
import { Link } from "react-router-dom";
import "../css/search.css";
import clickSound from "../sounds/mouse-click.wav";
import "../css/mediaQuerys/querySearch.css";

const Search = ({
  setShowCategories,
  setShowResult,
  setShowDetails,
  setShowRandom = () => {},
}) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [darkLight, setDarkLight] = useState(true);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
      .then((response) => response.json())
      .then((data) => setProducts(data.meals));
  }, []);

  useEffect(() => {
    if (products) {
      setTimeout(() => {
        const filteredProducts = products.filter((product) => {
          return (
            product.strMeal.toLowerCase().includes(search.toLowerCase()) ||
            product.strArea.toLowerCase().includes(search.toLowerCase()) ||
            (product.strTags &&
              product.strTags.toLowerCase().includes(search.toLowerCase())) ||
            product.strCategory.toLowerCase().includes(search.toLowerCase())
          );
        });
        setFiltered(filteredProducts);
      }, 500);
    }
  }, [search, products]);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div className="search_firstParentContainer">
      <Link to="/">
        <img src={Logo} alt={Logo} className="logo" onClick={handleClick} />
      </Link>
      <section className="big-container">
        <h1 className="headline-searchbar">
          Find a recipe, an idea, an inspiration...
        </h1>
        <div className="search-container">
          <section className="search-box">
            <input
              type="text"
              placeholder="Type something to search"
              onChange={(event) => {
                setSearch(event.target.value);
                setShowCategories(false);
                setShowResult(false);
                setShowDetails(false);
                setShowRandom(false);
              }}
              value={search}
              onClick={handleClick}
              style={{
                backgroundColor: darkLight
                  ? "rgba(212, 223, 199, 0.5)"
                  : "#e9e9e9",
              }}
            />

            <AiFillCloseCircle
              className="close-icon"
              size={30}
              onClick={reloadPage}
            />
          </section>

          <section className="result-container">
            {search &&
              filtered.map((product) => {
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
        </div>
      </section>
    </div>
  );
};
export default Search;
