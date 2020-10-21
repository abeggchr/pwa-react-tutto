import React, { FunctionComponent, useState } from "react";
import "./App.css";
import StartGame from "./StartTutto";
import PlayTutto, { PlayerModel } from "./PlayTutto";

const Tutto: FunctionComponent = () => {
  const [isGameOn, setGameOn] = useState(false);
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  return isGameOn ? (
    <PlayTutto players={players} />
  ) : (
    <StartGame
      onStart={(players) => {
        setPlayers(players);
        setGameOn(true);
      }}
    />
  );
};

export default Tutto;
