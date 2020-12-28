import React from "react";
import { render, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PlayTutto from "./PlayTutto";

const mockDraw = jest.fn().mockImplementation(() => {
  return {
    src: "/cards/bonus-200.jpg",
    name: "Bonus 200",
    occurence: 5,
    description: "Bonus 200 Description",
    validInputs: [100, 200, 300, 400, 500, 1000, 5000],
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
        onNewGame={() => {}}
        endOfGame={6000}
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

  test("shows description", () => {
    renderResult.getByAltText("Bonus 200").click();

    expect(renderResult.getByText("Bonus 200 Description")).toBeInTheDocument();
  });

  test("shows ranking", () => {
    userEvent.type(renderResult.getByAltText("Neuer Wert"), "100"); // Anna: 100
    renderResult.getByText("Weiter").click();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "200"); // Bob: 200
    renderResult.getByText("Weiter").click();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "300"); // Anna: 400
    renderResult.getByText("Weiter").click();

    renderResult.getByText("Bob").click();

    expect(renderResult.getByText("Rangliste")).toBeInTheDocument();
    expect(renderResult.getByText("Bob (200)")).toBeInTheDocument();
    expect(renderResult.getByText("Anna (400)")).toBeInTheDocument();
  });

  test("shows dialog when a player wins", () => {
    userEvent.type(renderResult.getByAltText("Neuer Wert"), "5000"); // Anna: 5000
    renderResult.getByText("Weiter").click();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "500"); // Bob: 500
    renderResult.getByText("Weiter").click();

    userEvent.type(renderResult.getByAltText("Neuer Wert"), "1000"); // Anna: 6000
    renderResult.getByText("Weiter").click();

    expect(renderResult.getByText("Anna hat gewonnen")).toBeInTheDocument();
    expect(renderResult.getByText("Rangliste")).toBeInTheDocument();
    expect(renderResult.getByText("Anna (6000)")).toBeInTheDocument();
    expect(renderResult.getByText("Bob (500)")).toBeInTheDocument();
  });


  test("performs input validation", () => {
    expect(renderResult.queryByText("Anna")).toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).not.toBeInTheDocument();
    
    userEvent.type(renderResult.getByAltText("Neuer Wert"), "42"); // invalid
    renderResult.getByText("Weiter").click();

    //expect(renderResult.getByAltText("Neuer Wert")).toBeInvalid();
    expect(renderResult.queryByText("Anna")).toBeInTheDocument();
    expect(renderResult.queryByText("Bob")).not.toBeInTheDocument();
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
        onNewGame={() => {}}
        endOfGame={6000}
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
