import React from "react";
import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StepsPageObject } from "./StepsPageObject";
import PlayTutto from "./PlayTutto";

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

    renderResult = render(
      <PlayTutto
        players={[
          { name: "Anna", points: [0] },
          { name: "Bob", points: [0] },
        ]}
      />
    );
  });

  test("indicates active player", () => {
    const steps = new StepsPageObject(renderResult);
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
    expect(renderResult.getByAltText("Bonus 200")).toBeInTheDocument();

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByAltText("Bonus 200")).toBeInTheDocument();
  });
});

describe("when there are 2 players Anna, Bob and Chris", () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    mockDraw.mockClear();

    renderResult = render(
      <PlayTutto
        players={[
          { name: "Anna", points: [0] },
          { name: "Bob", points: [0] },
          { name: "Chris", points: [0] },
        ]}
      />
    );
  });

  test("indicates active player", () => {
    const steps = new StepsPageObject(renderResult);
    expect(steps.isActive("Anna")).toBe(true);
    expect(steps.isActive("Bob")).toBe(false);
    expect(steps.isActive("Chris")).toBe(false);

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "100");
    renderResult.getByText("Weiter").click();

    expect(steps.isActive("Anna")).toBe(false);
    expect(steps.isActive("Bob")).toBe(true);
    expect(steps.isActive("Chris")).toBe(false);

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(steps.isActive("Anna")).toBe(false);
    expect(steps.isActive("Bob")).toBe(false);
    expect(steps.isActive("Chris")).toBe(true);

    userEvent.type(renderResult.getByLabelText("Neuer Wert"), "300");
    renderResult.getByText("Weiter").click();

    expect(steps.isActive("Anna")).toBe(true);
    expect(steps.isActive("Bob")).toBe(false);
    expect(steps.isActive("Chris")).toBe(false);
  });
});
