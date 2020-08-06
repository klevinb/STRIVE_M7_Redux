import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IData } from "../types/data";

interface DetailComponentProps {
  data: IData[];
}

type MixedProps = RouteComponentProps & DetailComponentProps;

class DetailComponent extends React.Component<MixedProps> {
  render() {
    return (
      <div>
        {this.props.data
          .filter((d) => d.valid)
          .map((data, i) => (
            <div key={i}>{data.id}</div>
          ))}
        <div>{this.props.location.pathname}</div>
      </div>
    );
  }
}

export default DetailComponent;
