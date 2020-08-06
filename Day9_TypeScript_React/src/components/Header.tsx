import React from "react";

interface HeaderProps {
  title: string;
  subTitle?: string;
}

interface HeaderState {
  count: number;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    count: 0,
  };

  increaseState = (): void => this.setState({ count: this.state.count + 1 });

  render() {
    return (
      <>
        <h1 onClick={this.increaseState}>
          {this.props.title}, value in the state: {this.state.count}
        </h1>
        {this.props.subTitle ? <h2>{this.props.subTitle}</h2> : <></>}
      </>
    );
  }
}

export default Header;
