import React, { Component } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { books } from "../data/books";
import { Toast } from "react-bootstrap";
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

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  changeBook = (id) => this.setState({ bookSelected: id });

  render() {
    return (
      <div className="row">
        <BookList
          bookSelected={this.state.bookSelected}
          changeBook={this.changeBook}
          books={books}
        />
        <BookDetail bookSelected={this.state.bookSelected} books={books} />
        <Toast
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          show={this.state.showPopover}
        >
          <Toast.Header>
            <strong className="mr-auto">Item added to the cart</strong>
          </Toast.Header>
        </Toast>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BookStore);
