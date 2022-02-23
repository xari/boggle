import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Custom, Random } from "./Board";

describe("the Random board", () => {
  const board = [
    ["v", "z", "g", "x"],
    ["j", "z", "g", "b"],
    ["t", "b", "j", "r"],
    ["u", "a", "c", "p"],
  ];
  const wrapper = shallow(<Random board={board} />);
  const grid = wrapper.find(".grid");

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

describe("the Custom board", () => {
  const dimensions = 4;
  const letterCount = 4 * 4;
  const wrapper = shallow(<Custom dimensions={dimensions} />);
  const grid = wrapper.find(".grid");

  test("should render the right number of inputs", () => {
    expect(grid.children()).toHaveLength(letterCount);
  });

  it("renders without any unexpected changes", () => {
    const tree = renderer.create(<Custom dimensions={dimensions} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
