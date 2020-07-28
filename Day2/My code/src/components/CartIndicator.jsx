import React from "react";
import Button from "react-bootstrap/Button";
import { FaShoppingCart } from "react-icons/fa";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

class CartIndicator extends React.Component {
  render() {
    return (
      <div className='cart'>
        <Router>
          <Button
            variant='primary'
            onClick={() => this.props.history.push("/cart")}
          >
            <FaShoppingCart style={{ marginRight: "10px" }} />
            <span>{this.props.cartItemsNr}</span>
          </Button>
        </Router>
      </div>
    );
  }
}

export default withRouter(CartIndicator);
