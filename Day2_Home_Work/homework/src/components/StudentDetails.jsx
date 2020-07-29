import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { withRouter } from "react-router-dom";

class StudentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: null,
    };
  }

  deleteProject = async (id) => {
    const resp = await fetch("http://localhost:3003/projects/" + id, {
      method: "DELETE",
    });
    if (resp.ok) {
      this.props.refetch();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.studentSelected !== this.props.studentSelected) {
      this.setState({
        student: this.props.students.find(
          (student) => student.studentid === this.props.studentSelected
        ),
      });
    } else if (prevProps.students !== this.props.students) {
      this.setState({
        student: this.props.students.find(
          (student) => student.studentid === this.props.studentSelected
        ),
      });
    }
  }

  render() {
    return this.state.student ? (
      <div className='col-sm-8'>
        <div className='row mt-3'>
          <div className='col-sm-5'>
            <img
              className='student-cover'
              src={this.state.student.image}
              alt='student selected'
            />
          </div>
          <div className='col-sm-7'>
            <p>
              <span className='font-weight-bold'>Name: </span>
              {this.state.student.name}
            </p>
            <p>
              <span className='font-weight-bold'>Surname: </span>
              {this.state.student.surname}
            </p>
            <p>
              <span className='font-weight-bold'>Email: </span>
              {this.state.student.email}
            </p>
            <p>
              <span className='font-weight-bold'>Nr of projects: </span>
              {this.state.student.projects.length}
            </p>
            <Button
              variant='info'
              onClick={() =>
                this.props.history.push(
                  "/backend/project/" + this.props.studentSelected
                )
              }
            >
              Add Project
            </Button>
          </div>
        </div>
        <div className='text-center'>
          {this.state.student.projects.length > 0 ? (
            <>
              <h3>Main Projects</h3>
              <ListGroup>
                <ListGroup.Item variant='dark'>
                  <div
                    style={{ fontWeight: "bold" }}
                    className='d-flex justify-content-between align-items-center'
                  >
                    <p>Name</p>
                    <p>Description</p>
                    <p>Live Url</p>
                    <p>Repo Url</p>
                    <p>Options</p>
                  </div>
                </ListGroup.Item>
                {this.state.student.projects.map((project) => (
                  <ListGroup.Item key={project.projectid}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <p>{project.name}</p>
                      <p>{project.description}</p>
                      <p>{project.liveurl}</p>
                      <p>{project.repourl}</p>
                      <div className='d-flex flex-column'>
                        <Button variant='warning' className='mb-2'>
                          Edit
                        </Button>
                        <Button
                          variant='danger'
                          onClick={() => this.deleteProject(project.projectid)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          ) : null}
        </div>
      </div>
    ) : (
      <div className='col-sm-8'>
        <div className='row mt-3'>
          <h3>No students selected</h3>
        </div>
      </div>
    );
  }
}

export default withRouter(StudentDetail);
