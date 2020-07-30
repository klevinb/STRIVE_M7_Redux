import React from "react";
import { Accordion, Button, Card, Col } from "react-bootstrap";

class Table1 extends React.Component {
  goToProjectPage = (id) => {
    this.props.props.history.push("/student/" + id);
  };

  render() {
    return (
      <>
        {this.props.students.map((student) => (
          <Col key={student._id} className='mb-3'>
            <Card
              style={{
                width: "18rem",
                display: "flex",
                background: "transparent",
                border: "0px",
                textAlign: "center",
              }}
            >
              <div className='d-flex justify-content-center'>
                {student.image ? (
                  <Card.Img
                    src={student.image}
                    style={{
                      width: "150px",
                      height: "150px",
                      alignSelf: "center",
                      borderRadius: "50%",
                    }}
                    onClick={() => this.goToProjectPage(student._id)}
                  />
                ) : (
                  <Card.Img
                    src='https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'
                    style={{ width: "150px", alignSelf: "center" }}
                    onClick={() => this.goToProjectPage(student._id)}
                  />
                )}
              </div>

              <Card.Body>
                <Card.Title>
                  {student.name} {student.surname}
                </Card.Title>
                <Card.Text className='m-0'>{student.email}</Card.Text>
                <div className='d-flex justify-content-between'>
                  {/* <Button
                    variant='danger'
                    onClick={() => this.props.deleteStudent(student._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='warning'
                    onClick={() => this.props.fetchStudentData(student._id)}
                  >
                    Edit
                  </Button> */}
                </div>
                {student.projects.length > 0 ? (
                  <Accordion defaultActiveKey='0'>
                    <Card style={{ background: "transparent", border: "0px" }}>
                      <Card.Header
                        style={{ background: "transparent", border: "0px" }}
                      >
                        <Accordion.Toggle
                          as={Button}
                          variant='link'
                          eventKey='1'
                        >
                          Projects
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey='1'>
                        <Card.Body
                          style={{
                            padding: "10px",
                            backgroundColor: "#ffc300",
                            borderRadius: "5%",
                          }}
                        >
                          {student.projects.slice(0, 5).map((project) => (
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                              <span
                                style={{
                                  wordWrap: "break-word",
                                  maxWidth: "130px",
                                }}
                              >
                                {project.name}
                              </span>
                              <Button variant='info'>Info</Button>
                            </div>
                          ))}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        ))}
        {/* <Table className="text-center" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Birthday</th>
                            <th colSpan="2">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.students.map((student, i) =>
                            <tr key={student._id}>
                                <td>{i + 1}</td>
                                <td onClick={() => props.fetchUser(student.id, student.name, student.surname)}>{student.name}</td>
                                <td>{student.surname}</td>
                                <td>{student.email}</td>
                                <td className="d-flex">
                                    <Button onClick={() => props.getStudentPhoto(student._id)} variant="warning" className="mr-3">View</Button>
                                    <Button variant={"info"}>
                                        <a style={{ color: "white" }} href={"http://127.0.0.1:3003/students/" + student._id + "/download"}>Download</a>
                                    </Button>
                                </td>
                                <td>{student.date.slice(0, 10)}</td>
                                <td><Button variant="warning" onClick={() =>
                                    props.fetchStudentData(student._id)
                                } >Edit</Button></td>
                                <td><Button variant="danger" onClick={() =>
                                    props.deleteStudent(student._id)
                                } >Delete</Button></td>
                                <td><Button variant="info" onClick={() => props.props.history.push("/student/" + student._id)}  >View Projects</Button></td>
                            </tr>
                        )}
    
                    </tbody>
                </Table> */}
      </>
    );
  }
}

export default Table1;
