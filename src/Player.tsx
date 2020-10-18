import React, { FunctionComponent } from "react";
import "./App.css";

const Player: FunctionComponent<{
  name: string;
  isActive: boolean;
  points: number;
}> = (props) => {
  const className = props.isActive ? "active" : "";

  return (
    <>
      <span className={className}>{props.name}</span>
    </>
  );
};

export default Player;
