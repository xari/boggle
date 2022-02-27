import React from "react";
import TestRenderer from "react-test-renderer";
import Controls from "./Controls";

describe("the Controls", () => {
  it("render without any unexpected changes", () => {
    const tree = TestRenderer.create(
      <Controls dimensions={4} enableRandom={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
