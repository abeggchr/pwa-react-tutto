import { Button, Input } from "antd";
import React, { FunctionComponent, useRef, useState } from "react";
import "./App.css";
import { UserOutlined } from "@ant-design/icons";

const StartGame: FunctionComponent<{ onStart: () => void }> = (props) => {
  const newPlayerInput = useRef<Input>(null);

  const [players, setPlayers] = useState<string[]>([]);

  const addPlayer = () => {
    const name = newPlayerInput?.current?.input?.value;
    if (name) {
      setPlayers([...players, name]);
    }
  };

  return (
    <>
      <ul>
        {players.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <Input
        id="newPlayerInput"
        ref={newPlayerInput}
        alt="Neuer Spieler:"
        prefix={<UserOutlined className="site-form-item-icon" />}
        addonAfter={<Button onClick={addPlayer}>+</Button>}
      />
      <Button onClick={props.onStart}>Spiel starten</Button>
    </>
  );
};

export default StartGame;
