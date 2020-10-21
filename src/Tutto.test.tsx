import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Tutto from "./Tutto";
import userEvent from "@testing-library/user-event";
import { StepsPageObject } from "./StepsPageObject";

const mockDraw = jest.fn().mockImplementation(() => {
  return {
    src: "/cards/bonus-200.jpg",
    name: "Bonus 200",
    occurence: 5,
  };
});

jest.mock("./Deck", () => {
  return {
    Deck: jest.fn().mockImplementation(() => {
      return { draw: mockDraw };
    }),
  };
});

describe("when there are 2 players Anna and Bob", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    mockDraw.mockClear();
    renderResult = render(<Tutto />);
  });

  test("removes start button after start", () => {
    const button = renderResult.getByText("Spiel starten");

    expect(button).toBeInTheDocument();
    button.click();

    expect(button).not.toBeInTheDocument();
  });

  test("indicates active player", () => {
    const steps = new StepsPageObject(renderResult);
    renderResult.getByText("Spiel starten").click();

    expect(steps.isActive("Anna")).toBe(true);
    expect(steps.isActive("Bob")).toBe(false);

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "100");
    renderResult.getByText("Weiter").click();

    expect(steps.isActive("Anna")).toBe(false);
    expect(steps.isActive("Bob")).toBe(true);

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(steps.isActive("Anna")).toBe(true);
    expect(steps.isActive("Bob")).toBe(false);
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

  test("draws and shows cards", () => {
    renderResult.getByText("Spiel starten").click();

    expect(renderResult.getByAltText("Bonus 200")).toBeInTheDocument();
    expect(mockDraw).toHaveBeenCalledTimes(2); // Todo: why twice?

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByAltText("Bonus 200")).toBeInTheDocument();
    expect(mockDraw).toHaveBeenCalledTimes(4); // Todo: why four times?
  });
});
