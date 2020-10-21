import { Button, Input } from "antd";
import React, { FunctionComponent, useRef, useState } from "react";
import "./App.css";
import {
  UserOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const StartGame: FunctionComponent<{ onStart: () => void }> = (props) => {
  const newPlayerInput = useRef<Input>(null);

  const [players, setPlayers] = useState<string[]>([]);

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

  return (
    <>
      <h2>Spieler</h2>
      <ul>
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

      <Button type="primary" onClick={props.onStart} shape="round">
        Spiel starten
      </Button>
    </>
  );
};

export default StartGame;
