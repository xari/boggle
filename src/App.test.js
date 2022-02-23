import React from "react";
import renderer from "react-test-renderer";
import { Results } from "./App";

describe("the Results", () => {
  const board = [
    ["v", "z", "g", "x"],
    ["j", "z", "g", "b"],
    ["t", "b", "j", "r"],
    ["u", "a", "c", "p"],
  ];

  it("render without any unexpected changes", () => {
    const tree = renderer.create(<Results board={board} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
