import { Route, Routes } from "react-router-dom";
import "./App.css";
import Random from "./components/Random";
import CategoryList from "./pages/CategoryList";
import ProductDetails from "./pages/ProductDetails";
import ProductItems from "./pages/ProductItems";
import ProductList from "./pages/ProductList";
import CategoryResults from "./pages/CategoryResults";
import CustomizedSwitches from "./components/MaterialUISwitch";
import { useState } from "react";

function App() {
  const [light, setLight] = useState(true);

  return (
    <div className="App" style={{ backgroundColor: light ? "#fff" : "#000" }}>
      <CustomizedSwitches light={light} setLight={setLight} />
      <Routes>
        <Route path="/" element={<CategoryList light={light} />} />
        <Route path="/random" element={<Random />} />
        <Route path="/productItems" element={<ProductItems />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/categoryList/:idCategory" element={<CategoryResults />} />
        <Route path="/categoryResults/:idMeal" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
