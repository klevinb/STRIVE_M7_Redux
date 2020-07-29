import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import Backend from "./components/Backend";
import { Navbar, Nav, Alert } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  logout: () =>
    dispatch({
      type: "LOGOUT",
    }),
});

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
        {this.props.loggedin ? (
          <>
            <Navbar bg='light' expand='lg'>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                  <Link to='/students' className='nav-link'>
                    Students
                  </Link>
                </Nav>

                <span className='mr-3'>
                  Welcome: {this.props.user.username}
                </span>
                <Link
                  to='/'
                  onClick={() => this.props.logout()}
                  style={{ color: "red" }}
                >
                  LOG OUT
                </Link>
              </Navbar.Collapse>
            </Navbar>
            <div className='row mt-2 mr-0'>
              <div className='container'>
                <Route
                  path='/students'
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
        ) : (
          <div className='d-flex  flex-column align-items-center mt-5'>
            <Alert variant='danger'>You are not logged in!</Alert>
            <Link to='/'>Go to Log In page!</Link>
          </div>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
