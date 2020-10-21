import Button from "antd/lib/button/button";
import React, { FunctionComponent, useRef, useState } from "react";
import "./App.css";
import { Input } from "antd";
import { UserOutlined, CrownOutlined } from "@ant-design/icons";
import { Card, Deck } from "./Deck";
import Modal from "antd/lib/modal/Modal";

export interface PlayerModel {
  name: string;
  points: number[];
}

interface Props {
  players: PlayerModel[];
}

const PlayTutto: FunctionComponent<Props> = (props) => {
  const deck = new Deck();

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [players, setPlayers] = useState<PlayerModel[]>(props.players);
  const [card, setCard] = useState<Card>(deck.draw());
  const [showRanking, setShowRanking] = useState(false);
  const [showCardManual, setShowCardManual] = useState(false);
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

  const getPlayersSortedByPoints = () => {
    return [...players].sort((a, b) => getPlayerPoints(b) - getPlayerPoints(a));
  };

  return (
    <div>
      <img
        src={card.src}
        alt={card.name}
        className="card"
        onClick={() => setShowCardManual(true)}
      ></img>

      <p className="values">
        <span onClick={() => setShowRanking(true)} className="player">
          <span className="playerName">{activePlayer.name}</span>
          {getPlayerOutline(activePlayer)}
          <span className="playerPoints">
            ({getPlayerPoints(activePlayer)})
          </span>
        </span>
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
      <Modal
        title="Rangliste"
        visible={showRanking}
        onOk={() => setShowRanking(false)}
        onCancel={() => setShowRanking(false)}
      >
        <ol>
          {getPlayersSortedByPoints().map((p) => (
            <li key={p.name}>
              {p.name} ({getPlayerPoints(p)})
            </li>
          ))}
        </ol>
      </Modal>
      <Modal
        title={card.name}
        visible={showCardManual}
        onOk={() => setShowCardManual(false)}
        onCancel={() => setShowCardManual(false)}
      >
        {card.description}
      </Modal>
    </div>
  );
};

export default PlayTutto;
