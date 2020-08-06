import React, { useState, Dispatch, SetStateAction } from "react";

interface HeaderProps {
  title: string;
  subTitle?: string;
}

const Header = (props: HeaderProps) => {
  const [count, setCount]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState(0);

  return (
    <>
      <h1 onClick={() => setCount(count + 1)}>
        {props.title}, value in the state: {count}
      </h1>
      {props.subTitle ? <h2>{props.subTitle}</h2> : <></>}
    </>
  );
};

export default Header;
