import React from "react";
import TestRenderer from "react-test-renderer";
import { Results } from "./App";
import { solve, reduceLetters } from "./utils";

let dictionary;

import("./dictionary_en_US.json").then((data) => {
  dictionary = data.words.filter((word) => word.length >= 3);
});

describe("the Results", () => {
  const board = [
    "v",
    "z",
    "g",
    "x",
    "j",
    "z",
    "g",
    "b",
    "t",
    "b",
    "j",
    "r",
    "u",
    "a",
    "c",
    "p",
  ];

  // Snapshots don't work here, because the time to solve the board is slightly different for each run
  it("render without any unexpected changes", () => {
    const results = solve(reduceLetters(board), dictionary);
    const testRenderer = TestRenderer.create(<Results results={results} />);
    const testInstance = testRenderer.root;

    testInstance
      .findAllByType("span")
      .forEach((node, i) => expect(node.text).toEqual(results[i]));
  });
});
