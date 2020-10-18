import React from "react";
import { render } from "@testing-library/react";
import Player from "./Player";

test("indicates name", () => {
  const renderResult = render(
    <Player name="Test" isActive={false} points={1000} />
  );
  expect(renderResult.getByText("Test")).toBeInTheDocument();
});

test("indicates points", () => {
  const renderResult = render(
    <Player name="Test" isActive={false} points={1000} />
  );
  expect(renderResult.getByText("1000")).toBeInTheDocument();
});

test("indicates active", () => {
  const renderResult = render(
    <Player name="Test" isActive={true} points={1000} />
  );
  expect(renderResult.getByText("Test").parentElement).toHaveClass("active");
});

test("indicates inactive", () => {
  const renderResult = render(
    <Player name="Test" isActive={false} points={1000} />
  );
  expect(renderResult.getByText("Test").parentElement).not.toHaveClass(
    "active"
  );
});
