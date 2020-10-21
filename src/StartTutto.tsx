import { Button, Input } from "antd";
import React, { FunctionComponent } from "react";
import "./App.css";
import { UserOutlined } from "@ant-design/icons";

const StartGame: FunctionComponent<{ onStart: () => void }> = (props) => {
  return (
    <>
      <Input
        id="new-player"
        prefix={<UserOutlined className="site-form-item-icon" />}
        addonBefore={<label htmlFor="new-player">Neuer Spieler: </label>}
        addonAfter={<Button>+</Button>}
      />
      <Button onClick={props.onStart}>Spiel starten</Button>
    </>
  );
};

export default StartGame;
