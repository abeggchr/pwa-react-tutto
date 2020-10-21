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

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [players, setPlayers] = useState<PlayerModel[]>(props.players);
  const [card, setCard] = useState<Card>(deck.draw());
  const activePlayer = players[activePlayerIndex];

  const inputRef = useRef<Input>(null);

  const onContinue = () => {
    let value = parseInt(inputRef.current!.input!.value);
    if (isNaN(value)) {
      value = 0;
    }
    const nextActivePlayer =
      activePlayerIndex === players.length - 1 ? 0 : activePlayerIndex + 1;
    setCard(deck.draw());
    setPlayers(
      players.map((p) => {
        if (players.indexOf(p) === activePlayerIndex) {
          p.points.push(value + getPlayerPoints(p));
        }
        return p;
      })
    );
    setActivePlayerIndex(nextActivePlayer);
    inputRef.current!.setValue("");
  };

  const getPlayersInSteps = () => {
    let retval = players.slice(activePlayerIndex - players.length);
    if (retval.length < players.length) {
      retval = retval.concat(players.slice(0, activePlayerIndex));
    }
    return retval.flat();
  };

  const getPlayerPoints = (player: PlayerModel) => {
    return player.points[player.points.length - 1];
  };

  const getPlayerOutline = (player: PlayerModel) => {
    const isWinner = !players.some(
      (p) =>
        p.name !== player.name && getPlayerPoints(p) > getPlayerPoints(player)
    );
    if (isWinner) {
      return <CrownOutlined />;
    } else {
      return <UserOutlined />;
    }
  };

  return (
    <div>
      <img src={card.src} alt={card.name} className="card"></img>

      <p className="values">
        <span className="playerName">{activePlayer.name}</span>
        {getPlayerOutline(activePlayer)}
        <span className="playerPoints">({getPlayerPoints(activePlayer)})</span>
        <Input
          type="number"
          id="newValue"
          alt="Neuer Wert"
          ref={inputRef}
          onPressEnter={onContinue}
          autoFocus={true}
        />
      </p>

      <Button onClick={onContinue} type="primary" shape="round">
        Weiter
      </Button>
    </div>
  );
};

export default PlayTutto;
