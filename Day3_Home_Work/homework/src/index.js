import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import StudentDetails from "../src/components/StudentDetails";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link to='/' className='nav-link'>
            Students
          </Link>
          <Link to='/backend' className='nav-link'>
            Back End
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Route path='/' exact component={App} />
    <Route path='/student/:id' component={StudentDetails} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
