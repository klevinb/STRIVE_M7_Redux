import React from "react";
import { FormControl } from "react-bootstrap";

interface Props {
  setSearch: any;
}

function Search({ setSearch }: Props) {
  const keyPress = (e: any): any => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
    }
  };

  return (
    <FormControl
      id='searchField'
      type='text'
      placeholder='Search'
      onKeyDown={(e: any): KeyboardEvent => keyPress(e)}
      className='mt-4'
    />
  );
}

export default Search;
