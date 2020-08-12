import React, { useState, Dispatch, SetStateAction } from "react";
import { FormControl } from "react-bootstrap";
import { FaSearchLocation } from "react-icons/fa";

interface Props {
  setSearch: any;
}

function Search({ setSearch }: Props) {
  const [location, setLocation]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");

  const keyPress = (e: any): any => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
    }
  };

  return (
    <>
      <FormControl
        id='searchField'
        type='text'
        placeholder='Search'
        onChange={(e: any): void => setLocation(e.currentTarget.value)}
        onKeyDown={(e: any): KeyboardEvent => keyPress(e)}
        className='mt-4'
      />
      <button style={{ display: "none" }} className='mt-4'>
        <FaSearchLocation onClick={() => setSearch(location)} />
      </button>
    </>
  );
}

export default Search;
