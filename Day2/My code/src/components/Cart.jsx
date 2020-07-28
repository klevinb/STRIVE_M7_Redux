import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { books } from "../data/books";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.setState({
      cart:
        this.props.cart &&
        this.props.cart.map((bookId) =>
          books.find((book) => book.id === bookId)
        ),
    });
  }

  componentDidUpdate(prevPorps) {
    if (prevPorps.cart !== this.props.cart) {
      this.setState({
        cart: this.props.cart.map((bookId) =>
          books.find((book) => book.id === bookId)
        ),
      });
    }
  }

  render() {
    return (
      <div className='row'>
        <ul className='col-sm-12' style={{ listStyle: "none" }}>
          {this.state.cart.map((book, i) => (
            <li key={i} className='my-4'>
              <Button
                variant='danger'
                onClick={() => {
                  this.props.removeFromCart(book.id);
                }}
              >
                <BsTrash />
              </Button>
              <img
                className='book-cover-small'
                src={book.imageUrl}
                alt='book selected'
              />
              {book.title + " "}
              {book.price + " $"}
            </li>
          ))}
        </ul>
        <div className='row'>
          <div className='col-sm-12 font-weigth-bold'>
            TOTAL:{" "}
            {this.state.cart.reduce(
              (acc, curr) => acc + parseFloat(curr.price),
              0
            )}{" "}
            $
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
