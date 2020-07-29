import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import Backend from "./components/Backend";
import { Navbar, Nav } from "react-bootstrap";

class App extends Component {
  state = {
    students: [],
  };

  fetchStudents = async () => {
    const resp = await fetch("http://localhost:3003/students");
    if (resp.ok) {
      const data = await resp.json();
      this.setState({
        students: data.students,
      });
    }
  };

  componentDidMount() {
    this.fetchStudents();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.students !== this.state.students) {
      this.setState({
        students: this.state.students,
      });
    }
  }

  render() {
    return (
      <>
        <Navbar bg='light' expand='lg'>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Link to='/' className='nav-link'>
                Students
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className='row mt-2'>
          <div className='container'>
            <Route
              path='/'
              exact
              render={(props) => (
                <MainPage
                  {...props}
                  students={this.state.students}
                  refetch={this.fetchStudents}
                />
              )}
            />
            <Route
              path='/backend/:case/:referenceId'
              render={(props) => (
                <Backend {...props} refetch={this.fetchStudents} />
              )}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
