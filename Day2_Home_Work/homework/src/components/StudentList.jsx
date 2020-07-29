import React from "react";
import Student from "./Student";

export default ({ students, changeStudent, studentSelected }) => (
  <ul className='col-sm-4'>
    {students.map((student, i) => (
      <Student
        {...student}
        key={i}
        changeStudent={changeStudent}
        studentSelected={studentSelected}
      />
    ))}
  </ul>
);
