import React from "react";
import "./App.css";
import CartIndicator from "./components/CartIndicator";
import BookStore from "./components/BookStore";
import Cart from "./components/Cart";
import { Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="container margin-top">
      <div className="row">
        <div className="col-sm-12 text-center background-div">
          <Link to="/">
            <h1>Strivazon Book Store</h1>
          </Link>
        </div>
        <CartIndicator />
      </div>
      <hr />
      <div className="container">
        <Route path="/" exact component={BookStore} />
        <Route path="/cart" exact component={Cart} />
      </div>
    </div>
  );
}

export default App;
