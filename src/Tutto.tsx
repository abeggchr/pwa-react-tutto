import Button from "antd/lib/button/button";
import React, { useRef, useState } from "react";
import "./App.css";
import { Steps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import StartGame from "./StartGame";

const { Step } = Steps;

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
      <Steps current={1}>
        {players.map((p) => (
          <Step
            title={p.name}
            description={p.points[p.points.length - 1]}
            icon={<UserOutlined />}
          />
        ))}
      </Steps>
      <label htmlFor="newValue">Neuer Wert</label>
      <input type="number" id="newValue" ref={inputRef} />
      <Button onClick={onContinue}>Weiter</Button>
    </div>
  ) : (
    <StartGame onStart={onStart} />
  );
};

export default Tutto;
