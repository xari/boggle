"use strict";

require("core-js/modules/web.url.to-json.js");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _testUtils = require("react-dom/test-utils");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _Board = _interopRequireDefault(require("./Board"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const board = ["v", "z", "g", "x", "j", "z", "g", "b", "t", "b", "j", "r", "u", "a", "c", "p"];
describe("The <Board/>", () => {
  const testRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_Board.default, {
    board: board,
    enabledRandom: false
  }));

  const testInstance = testRenderer.root;
  test("Should contain all of the letters", () => {
    testInstance.findAllByProps({
      type: "text"
    }).forEach((node, i) => expect(node.props.value).toEqual(board[i]));
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
  }); // Set-up mocks

  const onSetSubmitted = jest.fn();
  test("Should call the mocked setBoard() callback when submitted", () => {
    (0, _testUtils.act)(() => {
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_Board.default, {
        board: board,
        enabledRandom: false,
        setSubmitted: onSetSubmitted
      }), container);
    });
    const submitBtn = container.querySelector("input[type='submit']");
    (0, _testUtils.act)(() => {
      submitBtn.dispatchEvent(new MouseEvent("click", {
        bubbles: true
      }));
    });
    expect(onSetSubmitted.mock.calls.length).toBe(1);
  });
});