import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Search from "../components/Search";
import clickSound from "../sounds/mouse-click.wav";
import "../css/categoryResult.css";
import "../css/mediaQuerys/queryResult.css";
import Footer from "../components/Footer";

function CategoryResults() {
  const { idCategory } = useParams();
  const [meals, setMeals] = useState([]);
  const [showResult, setShowResult] = useState(true);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${idCategory}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
      });
  }, [idCategory]);

  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div>
      <Search
        setShowResult={setShowResult}
        setShowCategories={() => {}}
        setShowDetails={() => {}}
      />
      {showResult && (
        <div className="container_result">
          {meals.map((meal, index) => {
            return (
              <div
                style={
                  index % 2 === 0
                    ? { backgroundColor: "#a0bfb7" }
                    : { backgroundColor: "#d6dfc9" }
                }
                className="container_item"
                key={meal.idMeal}
                onClick={handleClick}
              >
                <Link to={`/categoryResults/${meal.idMeal}`}>
                  <p>{meal.strMeal}</p>
                  <img
                    className="container_img"
                    src={meal.strMealThumb}
                    alt="image"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
}
export default CategoryResults;
