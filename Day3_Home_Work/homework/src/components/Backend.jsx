import React, { Component } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

class Backend extends Component {
  state = {
    newProject: {
      name: "",
      description: "",
      repourl: "",
      liveurl: "",
      studentid: "",
    },
    projectId: "",
    newReview: {
      name: "",
      text: "",
    },
    photo: "",
    newStudent: {
      name: "",
      surname: "",
      email: "",
      birthday: "",
    },
    postButton: true,
  };

  handleChange = (e) => {
    const newProject = this.state.newProject;
    newProject[e.currentTarget.id] = e.currentTarget.value;
    this.setState({
      newProject,
    });
  };

  handleChangeProfile = (e) => {
    const newStudent = this.state.newStudent;
    newStudent[e.currentTarget.id] = e.currentTarget.value;
    this.setState({
      newStudent,
    });
    this.checkEmail();
  };

  componentDidMount() {
    if (this.props.match.params.case === "project") {
      this.setState({
        newProject: {
          ...this.state.newProject,
          studentid: this.props.match.params.referenceId,
        },
      });
    } else if (this.props.match.params.case === "review") {
      this.setState({
        projectId: this.props.match.params.referenceId,
      });
    }
  }

  saveImg = (e) => {
    this.setState({
      photo: e.target.files[0],
    });
  };

  checkEmail = async () => {
    const resp = await fetch("http://localhost:3003/students/checkEmail", {
      method: "POST",
      body: JSON.stringify(this.state.newStudent),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.ok) {
      this.setState({
        postButton: true,
      });
    } else {
      this.setState({
        postButton: false,
      });
    }
  };

  addProjectFunction = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("project", this.state.photo);

    let resp = await fetch("http://localhost:3003/projects", {
      method: "POST",
      body: JSON.stringify(this.state.newProject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const projectId = await resp.json();

    await fetch(
      "http://localhost:3003/projects/" + projectId.projectid + "/uploadPhoto",
      {
        method: "POST",
        body: data,
      }
    );
    console.log(resp);
    if (resp.ok) {
      this.setState({
        newProject: {
          name: "",
          description: "",
          repourl: "",
          liveurl: "",
          studentid: "",
        },
      });
      this.props.refetch();
      this.props.history.push("/");
    }
  };

  addNewStudent = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("profile", this.state.photo);

    const resp = await fetch("http://localhost:3003/students", {
      method: "POST",
      body: JSON.stringify(this.state.newStudent),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const studentId = await resp.json();

    await fetch(
      "http://localhost:3003/students/" + studentId.studentid + "/uploadPhoto",
      {
        method: "POST",
        body: data,
      }
    );

    if (resp.ok) {
      this.setState({
        postButton: true,
        newStudent: {
          name: "",
          surname: "",
          email: "",
          birthday: "",
        },
        photo: "",
      });
      this.props.refetch();
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <>
        {this.props.match.params.case === "project" && (
          <Form onSubmit={this.addProjectFunction}>
            <Row>
              <Col>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={this.state.newProject.name}
                    onChange={this.handleChange}
                    type='text'
                    placeholder='Name of the project'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    value={this.state.newProject.description}
                    onChange={this.handleChange}
                    placeholder='Description'
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='repourl'>
                  <Form.Label>Repo Link</Form.Label>
                  <Form.Control
                    value={this.state.newProject.repourl}
                    onChange={this.handleChange}
                    type='text'
                    placeholder='Link of the repo'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='liveurl'>
                  <Form.Label>Live Link</Form.Label>
                  <Form.Control
                    type='text'
                    value={this.state.newProject.liveurl}
                    onChange={this.handleChange}
                    placeholder='Link of live repo'
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className='d-flex justify-content-center'>
              <Button variant='primary' type='submit'>
                Add Project
              </Button>
            </div>
          </Form>
        )}
        {this.props.match.params.case === "profile" && (
          <Form onSubmit={this.addNewStudent}>
            <Row>
              <Col>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={this.state.newStudent.name}
                    onChange={this.handleChangeProfile}
                    type='text'
                    placeholder='Write your name'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='surname'>
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type='text'
                    value={this.state.newStudent.surname}
                    onChange={this.handleChangeProfile}
                    placeholder='Write your surname'
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId='email'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    value={this.state.newStudent.email}
                    onChange={this.handleChangeProfile}
                    placeholder='Enter email'
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='birthday'>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    value={this.state.newStudent.birthday}
                    onChange={this.handleChangeProfile}
                    type='date'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  type='file'
                  name='file'
                  onChange={this.saveImg}
                  accept='image/png, image/jpeg'
                />
              </Col>
            </Row>

            <div className='d-flex justify-content-center mt-3'>
              {this.state.postButton ? (
                <Button variant='primary' type='submit'>
                  POST
                </Button>
              ) : (
                <Alert variant='danger'>
                  Try another email because another user is using this one!
                </Alert>
              )}
            </div>
          </Form>
        )}
      </>
    );
  }
}

export default Backend;
