import React, { FunctionComponent } from "react";
import "./App.css";

const StartGame: FunctionComponent<{ onStart: () => void }> = (props) => {
  return <button onClick={props.onStart}>Spiel starten</button>;
};

export default StartGame;
