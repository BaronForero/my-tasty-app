import { Link } from "react-router-dom";
import clickSound from "../sounds/mouse-click.wav";
import "../css/productItems.css";
import "../css/mediaQuerys/queryItems.css";

const ProductItems = (props) => {
  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <Link
      to={`categoryResults/${props.idMeal}`}
      onClick={handleClick}
      className="productItems"
      style={
        props % 2 === 1
          ? { backgroundColor: "#a0bfb7" }
          : { backgroundColor: "#d6dfc9" }
      }
    >
      <div className="product-item">
        <h2>{props.strMeal}</h2>
        <img src={props.strMealThumb} alt="image" className="image" />
      </div>
    </Link>
  );
};

export default ProductItems;
