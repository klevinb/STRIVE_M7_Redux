import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  increment: () =>
    dispatch({
      type: "INCREMENT",
    }),
  decrement: () =>
    dispatch({
      type: "DECREMENT",
    }),
});

function App({ count, increment, decrement }) {
  return (
    <div className="App">
      <header className="App-header" style={{ fontSize: "5em" }}>
        <Button variant="info" onClick={increment}>
          +
        </Button>
        {count}
        <Button variant="info" onClick={decrement}>
          -
        </Button>
      </header>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
