import { shallow } from "enzyme";
import App, { Game } from "./App";

describe("the Boggle board", () => {
  const board = [
    ["v", "z", "g", "x"],
    ["j", "z", "g", "b"],
    ["t", "b", "j", "r"],
    ["u", "a", "c", "p"],
  ];
  const gameWrapper = shallow(<Game board={board} />);
  const grid = gameWrapper.find(".grid");

  test("should be the correct length", () => {
    expect(grid.children()).toHaveLength(16);
  });

  test("should contain all of the letters", () => {
    const boardArr = board.flatMap((x) => x);

    grid
      .find("span")
      .forEach((node, i) => expect(node.text()).toEqual(boardArr[i]));
  });
});
