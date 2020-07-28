import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import CartIndicator from "./components/CartIndicator";
import BookStore from "./components/BookStore";
import Cart from "./components/Cart";

class App extends Component {
  state = {
    cart: {
      products: [],
    },
  };

  handelAddToCart = (id) => {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        products: [...this.state.cart.products, id],
      },
    });
  };

  handelRemoveFromCart = (id) => {
    const bookToRemove = this.state.cart.products.findIndex(
      (bookId) => bookId === id
    );
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        products: [
          ...this.state.cart.products.slice(0, bookToRemove),
          ...this.state.cart.products.slice(bookToRemove + 1),
        ],
      },
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 text-center mt-4 mb-0'>
            <Link to='/'>
              <h1>Strivazon Book Store</h1>
            </Link>
          </div>
          <CartIndicator cartItemsNr={this.state.cart.products.length} />
        </div>
        <hr />
        <div className='container'>
          <Route
            path='/'
            exact
            render={(props) => (
              <BookStore {...props} addToCart={this.handelAddToCart} />
            )}
          />
          <Route
            path='/cart'
            exact
            render={(props) => (
              <Cart
                {...props}
                cart={this.state.cart.products}
                removeFromCart={this.handelRemoveFromCart}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
