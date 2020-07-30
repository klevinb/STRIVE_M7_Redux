import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) => {
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: id,
    });
  },
  // addToCart: (id) => {
  //   return dispatch((dispatch, getState) => {
  //     // async code
  //     console.log("A thunk was used tos dispatch this action", getState());
  //     dispatch({
  //       type: "ADD_ITEM_TO_CART",
  //       payload: id,
  //     });
  //   });
  // },
  addToCartThunk: (id) => dispatch(addItemWithThunk(id)),
});

const addItemWithThunk = (id) => {
  return (dispatch, getState) => {
    //async code
    console.log("A thunk was used to dispatch this action", getState());
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: id,
    });
  };
};

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
    };
  }

  componentDidUpdate(prevProps) {
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
        </div>
        <div className="row mt-3">
          <div className="col-sm-5 mt-3">
            <img
              className="book-cover"
              src={this.state.book.imageUrl}
              alt="book selected"
            />
          </div>
          <div className="col-sm-7">
            <p>
              <span className="font-weight-bold">Description:</span>{" "}
              {this.state.book.description}
            </p>
            <p>
              <span className="font-weight-bold">Price:</span>{" "}
              {this.state.book.price}
            </p>
            {this.props.user.username ? (
              <Button
                color="primary"
                onClick={() => this.props.addToCartThunk(this.state.book.id)}
              >
                BUY
              </Button>
            ) : (
              <p>Users must log in to purchase</p>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div className="col-sm-8">
        <div className="row margin-top">
          <div className="col-sm-12">
            <h3>Please select a book!</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
