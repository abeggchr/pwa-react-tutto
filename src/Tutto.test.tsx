import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Tutto from "./Tutto";
import userEvent from "@testing-library/user-event";

describe("when there are 2 players Anna and Bob", () => {
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

  test("indicates active player", () => {
    renderResult.getByText("Spiel starten").click();

    expect(renderResult.getByText("Anna").parentElement).toHaveClass("active");
    expect(renderResult.getByText("Bob").parentElement).not.toHaveClass(
      "active"
    );

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "100");
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("Anna").parentElement).not.toHaveClass(
      "active"
    );
    expect(renderResult.getByText("Bob").parentElement).toHaveClass("active");

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("Anna").parentElement).toHaveClass("active");
    expect(renderResult.getByText("Bob").parentElement).not.toHaveClass(
      "active"
    );
  });

  xtest("a simple game", () => {
    const button = renderResult.getByText("Spiel starten");

    expect(button).toBeInTheDocument();
    button.click();

    expect(button).not.toBeInTheDocument();
    expect(renderResult.getByText("Anna").parentElement).toHaveClass("active");
    expect(renderResult.getByText("Bob").parentElement).not.toHaveClass(
      "active"
    );

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "100");
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("Anna").parentElement).not.toHaveClass(
      "active"
    );
    expect(renderResult.getByText("Bob").parentElement).toHaveClass("active");
    expect(renderResult.getByText("100")).toBeInTheDocument();

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();
  });
});
