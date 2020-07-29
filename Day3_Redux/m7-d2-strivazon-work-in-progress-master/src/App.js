import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import CartIndicator from "./components/CartIndicator";
import BookStore from "./components/BookStore";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="container">
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
