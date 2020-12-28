import { Button, Input } from "antd";
import React, { FunctionComponent, useRef, useState } from "react";
import "./App.css";
import {
  UserOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import { PlayerModel } from "./PlayTutto";

const StartGame: FunctionComponent<{
  onStart: (players: PlayerModel[], endOfGame: number) => void;
}> = (props) => {
  const newPlayerInput = useRef<Input>(null);

  const [players, setPlayers] = useState<string[]>(["A", "B"]);
  const [endOfGame, setEndOfGame] = useState(6000);

  const addPlayer = () => {
    const name = newPlayerInput?.current?.input?.value;
    let newPlayers = players;
    if (name) {
      newPlayers = [...players, name];
      setPlayers(newPlayers);
    }
    newPlayerInput?.current?.setValue("");
    return newPlayers;
  };

  const removePlayer = (name: string) => {
    setPlayers(players.filter((p) => p !== name));
  };

  const onStart = () => {
    const updatedPlayers = addPlayer();
    const playerModels: PlayerModel[] = updatedPlayers.map((p) => {
      return { name: p, points: [0] };
    });
    props.onStart(playerModels, endOfGame);
  };

  return (
    <>
      <h2>Spieler</h2>
      <ul className="players">
        {players.map((p) => (
          <li key={p}>
            <UserOutlined />
            {p}
            <Button
              onClick={() => removePlayer(p)}
              icon={<MinusCircleOutlined />}
              shape="circle"
              title="-"
              style={{ marginLeft: "10px" }}
            />
          </li>
        ))}
        <li>
          <Input
            id="newPlayerInput"
            ref={newPlayerInput}
            alt="Neuer Spieler:"
            onPressEnter={addPlayer}
            prefix={<UserOutlined className="site-form-item-icon" />}
            addonAfter={
              <Button
                onClick={addPlayer}
                icon={<PlusCircleOutlined />}
                title="+"
              />
            }
          />
        </li>
        <li>
          <Input
              alt="Gewinn:"
              prefix={<CheckCircleOutlined className="site-form-item-icon" />}
              type={"number"}
              value={endOfGame}
              onChange={(e) => setEndOfGame(parseInt(e.target.value))}
          />
        </li>
      </ul>

      <Button
        type="primary"
        onClick={onStart}
        shape="round"
        disabled={players.length === 0}
      >
        Spiel starten
      </Button>
    </>
  );
};

export default StartGame;
