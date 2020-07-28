import React from "react";

export default ({
  id,
  title,
  price,
  changeBook,
  imageUrl,
  bookSelected,
  key,
}) => (
  <li
    key={key}
    className={bookSelected === id ? "border-thick card mt-3" : "card mt-3"}
    onClick={() => changeBook(id)}
    style={{ cursor: "pointer" }}
  >
    <div className='media card-body'>
      <img
        className='book-image'
        src={imageUrl}
        alt={`book cover for ${title} book`}
      />
      <div>
        <p>{title}</p>
        <p>{price} $</p>
      </div>
    </div>
  </li>
);
