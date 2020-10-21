import React, { FunctionComponent, useState } from "react";
import "./App.css";
import StartGame from "./StartTutto";
import PlayTutto from "./PlayTutto";

const Tutto: FunctionComponent = () => {
  const [isGameOn, setGameOn] = useState(false);

  const players = [{ name: "A", points: [] }];

  return isGameOn ? (
    <PlayTutto players={players} />
  ) : (
    <StartGame onStart={() => setGameOn(true)} />
  );
};

export default Tutto;
