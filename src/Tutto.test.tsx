import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Tutto from "./Tutto";
import userEvent from "@testing-library/user-event";

describe("when there Tutto is rendered", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Tutto />);
  });

  test("removes start button after start", () => {
    const button = renderResult.getByText("Spiel starten");

    expect(button).toBeInTheDocument();
    button.click();

    expect(button).not.toBeInTheDocument();
  });

  test("adds 2 players and starts game", async () => {
    renderResult.queryAllByTitle("-").forEach((b) => b.click());

    const input = renderResult.getByAltText("Neuer Spieler:");

    await userEvent.type(input, "Player1");
    renderResult.getByTitle("+").click();

    await userEvent.type(input, "Player2");
    renderResult.getByTitle("+").click();

    renderResult.getByText("Spiel starten").click();

    expect(renderResult.getByText("Player1")).toBeInTheDocument();
    expect(renderResult.getByText("Weiter")).toBeInTheDocument();
  });
});
