import React, { useState } from "react";
import "./App.css";
import Player from "./Player";
import StartGame from "./StartGame";

const Tutto: React.FunctionComponent = () => {
  const [isGameOn, setGameOn] = useState(false);
  const [activePlayer, setActivePlayer] = useState("Anna");
  const players = ["Anna", "Bob"];

  const onStart = () => {
    setGameOn(true);
  };

  return isGameOn ? (
    <div>
      {players.map((p) => (
        <Player name={p} points={0} isActive={p === activePlayer} />
      ))}
      <label htmlFor="newValue">Neuer Wert</label>
      <input type="number" id="newValue" />
      <button onClick={() => setActivePlayer("Bob")}>Weiter</button>
    </div>
  ) : (
    <StartGame onStart={onStart} />
  );
};

export default Tutto;
