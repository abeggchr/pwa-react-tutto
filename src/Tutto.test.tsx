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

  test("counts points", () => {
    renderResult.getByText("Spiel starten").click();

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "100");
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("100")).toBeInTheDocument();
    expect(renderResult.getByText("0")).toBeInTheDocument();

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("100")).toBeInTheDocument();
    expect(renderResult.getByText("200")).toBeInTheDocument();

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "300");
    renderResult.getByText("Weiter").click();

    expect(renderResult.queryByText("0")).not.toBeInTheDocument();
    expect(renderResult.queryByText("100")).not.toBeInTheDocument();
    expect(renderResult.getByText("300")).toBeInTheDocument();
    expect(renderResult.getByText("200")).toBeInTheDocument();
  });
});
