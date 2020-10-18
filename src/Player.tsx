import React, { FunctionComponent } from "react";
import "./App.css";

const Player: FunctionComponent<{
  name: string;
  isActive: boolean;
  points: number;
}> = (props) => {
  return (
    <li className={props.isActive ? "active" : ""}>
      <span>{props.name}</span>
      <span>{props.points}</span>
    </li>
  );
};

export default Player;
