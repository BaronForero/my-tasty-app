import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import "../css/categoryList.css";
import clickSound from "../sounds/mouse-click.wav";
import Footer from "../components/Footer";
import "../css/mediaQuerys/queryCategorylist.css";
import "animate.css";

function CategoryList({ light }) {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });
  }, []);

  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div>
      <Search
        light={light}
        setShowCategories={setShowCategories}
        setShowResult={() => {}}
        setShowDetails={() => {}}
      />
      {showCategories && (
        <>
          <h3 className="head-presentation">Or go to through our categories</h3>
          <div className="categoryListContainer">
            {categories.map((category, index) => {
              return (
                <article key={category.idCategory}>
                  <div
                    className="categoryList"
                    style={
                      index % 2 === 1
                        ? { backgroundColor: "#a0bfb7" }
                        : { backgroundColor: "#d6dfc9" }
                    }
                    onClick={handleClick}
                  >
                    <Link to={`/categoryList/${category.strCategory}`}>
                      <h2>{category.strCategory}</h2>
                      <img src={category.strCategoryThumb} alt="category" />
                    </Link>
                  </div>
                </article>
              );
            })}
            <Link
              to="/random"
              className="cagetoryList-random"
              onClick={handleClick}
            >
              <h2 className="random_headline">Random</h2>
            </Link>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default CategoryList;
