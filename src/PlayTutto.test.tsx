import React from "react";
import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    expect(renderResult.queryByText("Anna")).toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).not.toBeInTheDocument();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "100");
    renderResult.getByText("Weiter").click();

    expect(renderResult.queryByText("Anna")).not.toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).toBeInTheDocument();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(renderResult.queryByText("Anna")).toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).not.toBeInTheDocument();
  });

  test("counts points", () => {
    userEvent.type(renderResult.getByAltText("Neuer Wert"), "100"); // Anna: 100
    renderResult.getByText("Weiter").click();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "200"); // Bob: 200
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("(100)")).toBeInTheDocument(); // Anna: 100

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "300"); // Anna: 400
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("(200)")).toBeInTheDocument(); // Bob: 200

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "400"); // Bob: 500
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("(400)")).toBeInTheDocument(); // Anna: 400
  });

  test("draws and shows cards", () => {
    expect(renderResult.getByAltText("Bonus 200")).toBeInTheDocument();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByAltText("Bonus 200")).toBeInTheDocument();
  });
});

describe("when there are 3 players Anna, Bob and Chris", () => {
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
    expect(renderResult.queryByText("Anna")).toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).not.toBeInTheDocument();
    expect(renderResult.queryByText("Chris")).not.toBeInTheDocument();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "100");
    renderResult.getByText("Weiter").click();

    expect(renderResult.queryByText("Anna")).not.toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).toBeInTheDocument();
    expect(renderResult.queryByText("Chris")).not.toBeInTheDocument();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "200");
    renderResult.getByText("Weiter").click();

    expect(renderResult.queryByText("Anna")).not.toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).not.toBeInTheDocument();
    expect(renderResult.queryByText("Chris")).toBeInTheDocument();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "300");
    renderResult.getByText("Weiter").click();

    expect(renderResult.queryByText("Anna")).toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).not.toBeInTheDocument();
    expect(renderResult.queryByText("Chris")).not.toBeInTheDocument();
  });
});
