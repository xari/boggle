"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Board;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Board(_ref) {
  let {
    board,
    enabledRandom,
    setBoard,
    submitted,
    setSubmitted
  } = _ref;
  const dimensions = Math.sqrt(board.length);

  const handleSubmit = e => {
    e.preventDefault(); // Avoid page refresh

    setSubmitted();
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "my-3 mx-auto flex"
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("fieldset", {
    disabled: enabledRandom ? "disabled" : ""
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _utils.classNames)(dimensions === 4 ? "grid-cols-4" : dimensions === 5 ? "grid-cols-5" : "grid-cols-6", "grid gap-1")
  }, board.map((value, i, arr) => /*#__PURE__*/_react.default.createElement("div", {
    key: i,
    className: (0, _utils.classNames)(dimensions === 4 ? "h-24 sm:h-28 w-24 sm:w-28 text-3xl sm:text-4xl" : dimensions === 5 ? "h-20 sm:h-24 w-20 sm:w-24 sm:text-2xl md:text-3xl" : "h-16 sm:h-20 w-16 sm:w-20 sm:text-xl md:text-2xl", "flex border-2 content-center items-center text-center rounded")
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    name: "letter",
    className: (0, _utils.classNames)(enabledRandom && "bg-neutral-50", "h-full w-full font-light text-center focus:outline-none"),
    maxLength: "1",
    pattern: "[A-Za-z]",
    required: true,
    "aria-label": "Boggle letter",
    value: value,
    onChange: e => {
      submitted === true && setSubmitted(true); // true means reset

      setBoard([...arr.slice(0, i), e.target.value.toLowerCase(), ...arr.slice(i + 1)]);
    }
  }))))), /*#__PURE__*/_react.default.createElement("input", {
    type: "submit",
    className: "my-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    value: "Find all words",
    "aria-label": "Solve the board"
  })));
}