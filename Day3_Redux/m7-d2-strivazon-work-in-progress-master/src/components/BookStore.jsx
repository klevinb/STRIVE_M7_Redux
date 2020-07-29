import React, { Component } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { Toast } from "react-bootstrap";
import { books } from "../data/books";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;
class BookStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookSelected: null,
      showPopover: false,
    };
  }

  popOverToggle = () => {
    this.setState({ showPopover: !this.state.showPopover });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.cart.products.length < this.props.cart.products.length) {
      this.setState({ showPopover: true }, () => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(
          () => this.setState({ showPopover: false }),
          2500
        );
      });
    }
  }

  changeBook = (id) => this.setState({ bookSelected: id });

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const bookTitle = books.find((book) => book.id === this.state.bookSelected);
    return (
      <div className="row">
        <BookList
          books={books}
          bookSelected={this.state.bookSelected}
          changeBook={this.changeBook}
        />
        <BookDetail books={books} bookSelected={this.state.bookSelected} />
        <Toast
          style={{ position: "absolute", top: 15, right: 15 }}
          show={this.state.showPopover}
          onClose={this.popOverToggle}
        >
          <Toast.Header>
            <span>
              <strong>{bookTitle && bookTitle.title}</strong> added to the cart
            </span>
          </Toast.Header>
        </Toast>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BookStore);
