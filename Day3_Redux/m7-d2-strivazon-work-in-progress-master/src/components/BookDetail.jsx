import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) =>
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: id,
    }),
});

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.bookSelected !== this.props.bookSelected) {
      this.setState({
        book: this.props.books.find(
          (book) => book.id === this.props.bookSelected
        ),
      });
    }
  }

  render() {
    return this.state.book ? (
      <div className="col-sm-8">
        <div className="row mt-3">
          <div className="col-sm-12">
            <h1>{this.state.book.title}</h1>
          </div>
          <div className="row mt-3">
            <div className="col-sm-5">
              <img
                className="book-cover"
                src={this.state.book.imageUrl}
                alt="book selected"
              />
            </div>
            <div className="col-sm-7">
              <p>
                <span className="font-weight-bold">Description: </span>
                {this.state.book.description}
              </p>
              <p>
                <span className="font-weight-bold">Price: </span>
                {this.state.book.price}
              </p>
              {this.props.user.username ? (
                <Button
                  color="primary"
                  onClick={() => this.props.addToCart(this.state.book.id)}
                >
                  BUY
                </Button>
              ) : (
                <p>Users must log in to purchase</p>
              )}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="col-sm-8">
        <div className="row margin-top">
          <h3> Please select a book! </h3>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
