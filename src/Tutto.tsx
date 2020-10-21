import Button from "antd/lib/button/button";
import React, { useRef, useState } from "react";
import "./App.css";
import { Steps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import StartGame from "./StartGame";
import { Card, Deck } from "./Deck";

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
  const deck = new Deck();
  const [card, setCard] = useState<Card>(deck.draw());

  const inputRef = useRef<HTMLInputElement>(null);

  const onStart = () => {
    setGameOn(true);
  };

  const onContinue = () => {
    const value = parseInt(inputRef.current!.value);
    setCard(deck.draw());
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

  const playersInSteps = () => {
    let retval = players.slice(activePlayer - players.length);
    console.log(retval);
    if (retval.length < players.length) {
      retval = retval.concat(players.slice(0, activePlayer));
    }
    return retval.flat();
  };

  return isGameOn ? (
    <div>
      <div data-testid="steps-container">
        <Steps current={0}>
          {playersInSteps().map((p) => (
            <Step
              title={p.name}
              description={p.points[p.points.length - 1]}
              icon={<UserOutlined />}
              key={p.name}
            />
          ))}
        </Steps>
      </div>
      <img src={card.src} alt={card.name}></img>
      <label htmlFor="newValue">Neuer Wert</label>
      <input type="number" id="newValue" ref={inputRef} />
      <Button onClick={onContinue}>Weiter</Button>
    </div>
  ) : (
    <StartGame onStart={onStart} />
  );
};

export default Tutto;
