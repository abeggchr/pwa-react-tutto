import { Button, Input } from "antd";
import React, { FunctionComponent, useRef, useState } from "react";
import "./App.css";
import {
  UserOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { PlayerModel } from "./PlayTutto";

const StartGame: FunctionComponent<{
  onStart: (players: PlayerModel[]) => void;
}> = (props) => {
  const newPlayerInput = useRef<Input>(null);

  const [players, setPlayers] = useState<string[]>(["A", "B"]);

  const addPlayer = () => {
    const name = newPlayerInput?.current?.input?.value;
    if (name) {
      setPlayers([...players, name]);
    }
    newPlayerInput?.current?.setValue("");
  };

  const removePlayer = (name: string) => {
    setPlayers(players.filter((p) => p !== name));
  };

  const onStart = () => {
    const out: PlayerModel[] = players.map((p) => {
      return { name: p, points: [0] };
    });
    props.onStart(out);
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
