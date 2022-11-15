import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import NotFound from "./components/NoFound/NotFound";
import ProductDetails from "./components/ProductPage/ProductDetails/ProductDetails";
import Products from "./components/ProductPage/Products/Products";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Products></Products>}></Route>
        <Route path="/product" element={<Products></Products>}></Route>
        <Route path="/product/:slug" element={<ProductDetails></ProductDetails>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="*/" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
