import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Tutto from "./Tutto";

describe("when there are 2 players Anna and Bob", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Tutto />);
  });

  test("start game", () => {
    const button = renderResult.getByText("Spiel starten");

    expect(button).toBeInTheDocument();
    button.click();

    expect(button).not.toBeInTheDocument();
    expect(renderResult.getByText("Anna")).toBeInTheDocument();
    expect(renderResult.getByText("Bob")).toBeInTheDocument();
  });
});
