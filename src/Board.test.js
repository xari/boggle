import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TestRenderer from "react-test-renderer";
import Board from "./Board";

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

describe("The <Board/>", () => {
  const testRenderer = TestRenderer.create(
    <Board board={board} enabledRandom={false} />
  );
  const testInstance = testRenderer.root;

  test("Should contain all of the letters", () => {
    testInstance
      .findAllByProps({ type: "text" })
      .forEach((node, i) => expect(node.props.value).toEqual(board[i]));
  });

  it("renders without any unexpected changes", () => {
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("mocking the form submission", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  // Set-up mocks
  const onSetSubmitted = jest.fn();

  test("Should call the mocked setBoard() callback when submitted", () => {
    act(() => {
      ReactDOM.render(
        <Board
          board={board}
          enabledRandom={false}
          setSubmitted={onSetSubmitted}
        />,
        container
      );
    });

    const submitBtn = container.querySelector("input[type='submit']");

    act(() => {
      submitBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onSetSubmitted.mock.calls.length).toBe(1);
  });
});
