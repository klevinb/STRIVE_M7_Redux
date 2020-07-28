import React from "react";
import Book from "./Book";

export default ({ books, changeBook, bookSelected }) => (
  <ul className='col-sm-4'>
    {books.map((book, i) => (
      <Book
        {...book}
        key={i}
        changeBook={changeBook}
        bookSelected={bookSelected}
      />
    ))}
  </ul>
);
