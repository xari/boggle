import { reduceLetters, solve, createRandomBoard } from "./utils";

describe("generating a random Boggle board", () => {
  const dimensions = 3;
  const board = createRandomBoard(dimensions);

  test("it should have the correct dimensions", () => {
    expect(board).toHaveLength(dimensions);

    [...Array(dimensions).keys()].forEach((col) =>
      expect(board[col]).toHaveLength(dimensions)
    );
  });
});

describe("finding specific words in a Boggle board", () => {
  const board = [
    ["v", "z", "g", "x"],
    ["j", "z", "g", "b"],
    ["t", "b", "j", "r"],
    ["u", "a", "c", "p"],
  ];
  const testWords = [
    "cab",
    "cat",
    "abt",
    "abu",
    "abc",
    "abut",
    "uta",
    "ubc",
    "jab",
    "jat",
  ];

  let dictionary;

  import("./dictionary_en_US.json").then((data) => {
    dictionary = data.words.filter((word) => word.length >= 3);
  });

  test("the board contains the words", () => {
    const { words } = solve(board, dictionary);

    testWords.forEach((word) => expect([...words]).toContain(word));
  });
});

describe("Reducing the board's input values", () => {
  const dimensions = 3;
  const inputCount = dimensions * dimensions;
  const inputArr = [...Array(inputCount).keys()].map((letter) => ({
    value: letter,
  }));
  const board = reduceLetters(dimensions)(inputArr);

  test("The created board to have the right dimensions", () => {
    expect(board.length).toEqual(dimensions);
    board.forEach((row) => expect(row.length).toEqual(dimensions));
  });
});
