import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  login: (username) =>
    dispatch({
      type: "LOGIN",
      payload: username,
    }),
});

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  setUsername = (e) => {
    this.setState({
      username: e.currentTarget.value,
    });
  };

  render() {
    return (
      <Container className='d-flex justify-content-center'>
        <div className='mt-5'>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId='formPlaintextEmail'>
                  <Form.Control
                    type='username'
                    placeholder='Username'
                    onChange={this.setUsername}
                  />
                </Form.Group>

                <Form.Group controlId='formPlaintextPassword'>
                  <Form.Control type='password' placeholder='Password' />
                </Form.Group>
                <div className='d-flex justify-content-center'>
                  <Button
                    onClick={() => {
                      this.props.login(this.state.username);
                      this.props.history.push("/students");
                    }}
                  >
                    Log in
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
