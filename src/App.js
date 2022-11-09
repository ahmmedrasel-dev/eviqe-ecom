import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/HomePage/Home/Home";
import ProductDetails from "./components/ProductPage/ProductDetails/ProductDetails";
import Products from "./components/ProductPage/Products/Products";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/product" element={<Products></Products>}></Route>
        <Route path="/product/:slug" element={<ProductDetails></ProductDetails>}></Route>
      </Routes>
    </>
  );
}

export default App;
