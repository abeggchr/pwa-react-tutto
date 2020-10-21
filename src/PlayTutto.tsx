import Button from "antd/lib/button/button";
import React, { FunctionComponent, useRef, useState } from "react";
import "./App.css";
import { Input, Steps } from "antd";
import { UserOutlined, CrownOutlined } from "@ant-design/icons";
import { Card, Deck } from "./Deck";

const { Step } = Steps;

export interface PlayerModel {
  name: string;
  points: number[];
}

interface Props {
  players: PlayerModel[];
}

const PlayTutto: FunctionComponent<Props> = (props) => {
  const deck = new Deck();

  const getPlayersCurrentPoints = (index: number) => {
    const points = players[index]?.points;
    if (points) {
      return points[points.length - 1];
    } else {
      return 0;
    }
  };

  const [activePlayer, setActivePlayer] = useState(0);
  const [players, setPlayers] = useState<PlayerModel[]>(props.players);
  const [card, setCard] = useState<Card>(deck.draw());
  const [value, setValue] = useState<number>(getPlayersCurrentPoints(0));

  const inputRef = useRef<Input>(null);

  const onContinue = () => {
    const value = parseInt(inputRef.current!.input!.value);
    const nextActivePlayer = activePlayer === 0 ? 1 : 0;
    setCard(deck.draw());
    setPlayers(
      players.map((p) => {
        if (players.indexOf(p) === activePlayer) {
          p.points.push(value);
        }
        return p;
      })
    );
    setActivePlayer(nextActivePlayer);
    setValue(getPlayersCurrentPoints(nextActivePlayer));
  };

  const getPlayersInSteps = () => {
    let retval = players.slice(activePlayer - players.length);
    if (retval.length < players.length) {
      retval = retval.concat(players.slice(0, activePlayer));
    }
    return retval.flat();
  };

  const getPlayerOutline = (player: PlayerModel) => {
    const isWinner = !players.some(
      (p) =>
        p.name != player.name &&
        p.points[p.points.length - 1] > player.points[player.points.length - 1]
    );
    if (isWinner) {
      return <CrownOutlined />;
    } else {
      return <UserOutlined />;
    }
  };

  return (
    <div>
      <div data-testid="steps-container">
        <Steps current={0}>
          {getPlayersInSteps().map((p) => (
            <Step
              title={p.name}
              description={p.points[p.points.length - 1]}
              icon={getPlayerOutline(p)}
              key={p.name}
            />
          ))}
        </Steps>
      </div>
      <img src={card.src} alt={card.name} className="card"></img>

      <p className="values">
        <Input
          type="number"
          id="oldValue"
          value={getPlayersCurrentPoints(activePlayer)}
          disabled
          addonBefore={<label htmlFor="oldValue">Alter Wert</label>}
        />

        <Input
          type="number"
          id="newValue"
          ref={inputRef}
          value={value}
          onChange={(event) => {
            setValue(parseInt(event.target.value));
          }}
          onPressEnter={onContinue}
          addonBefore={<label htmlFor="newValue">Neuer Wert</label>}
        />

        <Input
          type="number"
          id="difference"
          value={value - getPlayersCurrentPoints(activePlayer)}
          disabled
          addonBefore={<label htmlFor="difference">Differenz</label>}
        />
      </p>

      <Button onClick={onContinue} type="primary" shape="round">
        Weiter
      </Button>
    </div>
  );
};

export default PlayTutto;
