import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { books } from "../data/books";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  removeFromCart: (id) =>
    dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: id }),
});

class Cart extends Component {
  render() {
    const cart = this.props.cart.products.map((bookId) =>
      books.find((book) => book.id === bookId)
    );
    return (
      <div className="row">
        <ul className="col-sm-12" style={{ listStyle: "none" }}>
          {cart.map((book, i) => (
            <li key={i} className="my-4">
              <Button
                variant="danger"
                onClick={() => this.props.removeFromCart(book.id)}
              >
                <FontAwesomeIcon icon={faTrash} id="trashIcon" />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
        <div className="row">
          <div className="col-sm-12 font-weight-bold">
            TOTAL:{" "}
            {cart.reduce(
              (acc, currentValue) => acc + parseFloat(currentValue.price),
              0
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
