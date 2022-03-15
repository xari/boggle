"use strict";

require("core-js/modules/web.url.to-json.js");

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _Controls = _interopRequireDefault(require("./Controls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("the Controls", () => {
  it("render without any unexpected changes", () => {
    const tree = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_Controls.default, {
      dimensions: 4,
      enableRandom: true
    })).toJSON();

    expect(tree).toMatchSnapshot();
  });
});