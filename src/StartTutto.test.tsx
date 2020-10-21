import React from "react";
import { render, RenderResult } from "@testing-library/react";
import StartTutto from "./StartTutto";
import userEvent from "@testing-library/user-event";

let renderResult: RenderResult;
let mockedOnStart: jest.Mock;

beforeEach(() => {
  mockedOnStart = jest.fn();
  renderResult = render(<StartTutto onStart={mockedOnStart} />);
});

test("adds player", async () => {
  const input = renderResult.getByLabelText("Neuer Spieler:");

  await userEvent.type(input, "A");
});
