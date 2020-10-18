import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Tutto from "./Tutto";

describe("when there are 2 players Anna and Bob", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Tutto />);
  });

  test("a simple game", () => {
    const button = renderResult.getByText("Spiel starten");

    expect(button).toBeInTheDocument();
    button.click();

    expect(button).not.toBeInTheDocument();
    expect(renderResult.getByText("Anna")).toHaveClass("active");
    expect(renderResult.getByText("Bob")).not.toHaveClass("active");
  });
});
