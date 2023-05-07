import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/productDetails.css";
import Search from "../components/Search";
import Footer from "../components/Footer";
import "../css/mediaQuerys/queryDetails.css";

const ProductDetails = () => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const { idMeal } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        const json = await response.json();
        setDetails(json.meals);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [idMeal]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const meal = details[0];
  const instructions = meal.strInstructions
    .split("\r\n")
    .map((instruction, index) => {
      return (
        <li key={index} className="instruction-points">
          {instruction}
        </li>
      );
    });
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        <p key={i} className="ingredient-points">
          {/* {meal[`strIngredient${i}`]} - {meal[`strMeasure${i}`]} */}
          {meal[`strMeasure${i}`]} {meal[`strIngredient${i}`]}
        </p>
      );
    }
  }

  return (
    <div>
      <Search
        setShowDetails={setShowDetails}
        setShowResult={() => {}}
        setShowCategories={() => {}}
      />
      {showDetails && (
        <div className="product-details">
          {details && details && (
            <img
              src={meal.strMealThumb}
              alt="img"
              className="product-detailsImg"
            />
          )}
          <div className="details-flex">
            <div className="instructions">
              <h1 className="product-details-headline">{meal.strMeal}</h1>

              <ul className="instruction-block">{instructions}</ul>
            </div>
            <div>
              <h3 className="product-details-h3">Ingredients</h3>
              <div className="productDetails-ingredient-block">
                {ingredients}
              </div>
              <Link to={meal.strYoutube} className="productDetails-link">
                Watch Video
              </Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetails;
