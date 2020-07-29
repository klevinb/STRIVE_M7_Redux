import React from "react";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentSelected: null,
    };
  }

  changeStudent = (id) => this.setState({ studentSelected: id });

  render() {
    return (
      <div className='row '>
        <StudentList
          students={this.props.students}
          studentSelected={this.state.studentSelected}
          changeStudent={this.changeStudent}
        />
        <StudentDetails
          refetch={this.props.refetch}
          students={this.props.students}
          studentSelected={this.state.studentSelected}
        />
      </div>
    );
  }
}

export default MainPage;
