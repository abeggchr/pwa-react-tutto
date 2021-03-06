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
  const input = renderResult.getByAltText("Neuer Spieler:");

  expect(renderResult.queryByText("Player")).not.toBeInTheDocument();
  await userEvent.type(input, "Player");
  renderResult.getByTitle("+").click();

  expect(renderResult.getByText("Player")).toBeInTheDocument();
});

test("removes player", async () => {
  renderResult.queryAllByTitle("-").forEach((b) => b.click()); // remove all existing

  const input = renderResult.getByAltText("Neuer Spieler:");
  await userEvent.type(input, "Player");
  renderResult.getByTitle("+").click();

  renderResult.getByTitle("-").click();
  expect(renderResult.queryByText("Player")).not.toBeInTheDocument();
});

test("sets winning threshold", async () => {
  const input = renderResult.getByAltText("Gewinn:");
  expect(input).toHaveValue(6000);
  
  await userEvent.type(input, "7000");
  expect(input).toHaveValue(7000);
});