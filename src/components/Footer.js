import { FiInstagram } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";
import "../css/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer-container">
      <Link to="https://www.instagram.com/" className="hvr-grow-shadow">
        <FiInstagram size={25} />
      </Link>
      <Link to="https://www.youtube.com/" className="hvr-grow-shadow">
        <FiYoutube size={30} />
      </Link>
      <Link to="https://www.facebook.com/" className="hvr-grow-shadow">
        <FaFacebookSquare size={30} />
      </Link>
    </section>
  );
};

export default Footer;
