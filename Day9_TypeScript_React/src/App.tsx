import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DetailComponent from "./components/DetailComponent";

import data from "./data/data";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header title="Main Title" subTitle="This is an optional subtitle" />
          <Route
            path="/detail"
            exact
            render={(props) => <DetailComponent {...props} data={data} />}
          />
        </header>
      </div>
    </Router>
  );
}

export default App;
