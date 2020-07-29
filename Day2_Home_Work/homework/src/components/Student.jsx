import React from "react";

export default ({
  studentid,
  name,
  surname,
  image,
  key,
  studentSelected,
  changeStudent,
}) => (
  <li
    key={key}
    className={
      studentSelected === studentid ? "border-thick card mt-3" : "card mt-3"
    }
    onClick={() => changeStudent(studentid)}
    style={{ cursor: "pointer" }}
  >
    <div className='media card-body'>
      <img
        className='student-image'
        src={image}
        alt={`Student ${name} photo`}
      />
      <div>
        <p>{name}</p>
        <p>{surname}</p>
      </div>
    </div>
  </li>
);
