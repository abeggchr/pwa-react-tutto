import React, { useRef, useState } from "react";
import "./App.css";
import Player from "./Player";
import StartGame from "./StartGame";

interface PlayerModel {
  name: string;
  points: number[];
}

const Tutto: React.FunctionComponent = () => {
  const [isGameOn, setGameOn] = useState(false);
  const [activePlayer, setActivePlayer] = useState(0);
  const [players, setPlayers] = useState<PlayerModel[]>([
    { name: "Anna", points: [0] },
    { name: "Bob", points: [0] },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onStart = () => {
    setGameOn(true);
  };

  const onContinue = () => {
    const value = parseInt(inputRef.current!.value);
    setPlayers(
      players.map((p) => {
        if (players.indexOf(p) === activePlayer) {
          p.points.push(value);
        }
        return p;
      })
    );
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  };

  return isGameOn ? (
    <div>
      <ul>
        {players.map((p) => (
          <Player
            name={p.name}
            points={p.points[p.points.length - 1]}
            isActive={players.indexOf(p) === activePlayer}
            key={p.name}
          />
        ))}
      </ul>
      <label htmlFor="newValue">Neuer Wert</label>
      <input type="number" id="newValue" ref={inputRef} />
      <button onClick={onContinue}>Weiter</button>
    </div>
  ) : (
    <StartGame onStart={onStart} />
  );
};

export default Tutto;
