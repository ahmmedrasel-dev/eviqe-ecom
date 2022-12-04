import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import NotFound from "./components/NoFound/NotFound";
import ProductDetails from "./components/ProductPage/ProductDetails/ProductDetails";
import Products from "./components/ProductPage/Products/Products";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Login from "./components/Login/Login";
import Wishlist from "./components/Wishlist/Wishlist";
import ProductCompare from "./components/ProductCompare/ProductCompare";
import Shipping from "./components/Shipping/Shipping";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Products></Products>}></Route>
        <Route path="/product" element={<Products></Products>}></Route>
        <Route path="/product/:slug" element={<ProductDetails></ProductDetails>}></Route>
        <Route path="/productCompare" element={<ProductCompare></ProductCompare>}></Route>
        <Route path="/wishlist" element={<Wishlist></Wishlist>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/signin" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/shipping" element={<Shipping></Shipping>}></Route>
        <Route path="*/" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
