import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Tutto from "./Tutto";

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
});
