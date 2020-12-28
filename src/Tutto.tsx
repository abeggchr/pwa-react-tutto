import React, { FunctionComponent, useState } from "react";
import "./App.css";
import StartGame from "./StartTutto";
import PlayTutto, { PlayerModel } from "./PlayTutto";

const Tutto: FunctionComponent = () => {
  const [isGameOn, setGameOn] = useState(false);
  const [endOfGame, setEndOfGame] = useState(6000);
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  return isGameOn ? (
    <PlayTutto
      players={players}
      endOfGame={endOfGame}
      onNewGame={() => {
        setGameOn(false);
      }}
    />
  ) : (
    <StartGame
      onStart={(players, endOfGame) => {
        setPlayers(players);
        setGameOn(true);
        setEndOfGame(endOfGame);
      }}
    />
  );
};

export default Tutto;
