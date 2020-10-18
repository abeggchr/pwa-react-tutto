import React, { useState } from "react";
import "./App.css";
import StartGame from "./StartGame";

const Tutto: React.FunctionComponent = () => {
  const [isGameOn, setGameOn] = useState(false);

  const onStart = () => {
    setGameOn(true);
  };

  return isGameOn ? (
    <div>
      <span>Anna</span>
      <span>Bob</span>
    </div>
  ) : (
    <StartGame onStart={onStart} />
  );
};

export default Tutto;
