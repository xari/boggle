"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Controls;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@headlessui/react");

var _utils = require("./utils");

require("./Controls.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Range(_ref) {
  let {
    value,
    onChange
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "my-2"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "flex-grow flex flex-col"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "text-md font-medium text-gray-900"
  }, "Board size"), /*#__PURE__*/_react.default.createElement("span", {
    className: "text-sm text-gray-500"
  }, "Slide the bar to resize the board.")), /*#__PURE__*/_react.default.createElement("input", {
    type: "range",
    min: "4",
    max: "6",
    step: "1",
    value: value,
    onChange: onChange,
    "aria-label": "Boggle board size"
  }));
}

function BoardSwitch(_ref2) {
  let {
    enabledRandom,
    setEnabledRandom
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_react2.Switch.Group, {
    as: "div"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "flex-grow flex flex-col"
  }, /*#__PURE__*/_react.default.createElement(_react2.Switch.Label, {
    as: "span",
    className: "text-md font-medium text-gray-900",
    passive: true
  }, "Solve an auto-generated board instead"), /*#__PURE__*/_react.default.createElement(_react2.Switch.Description, {
    as: "span",
    className: "text-sm text-gray-500"
  }, "Toggle betwenn an auto-generated board and a customizable one.")), /*#__PURE__*/_react.default.createElement(_react2.Switch, {
    checked: enabledRandom,
    onChange: setEnabledRandom,
    className: (0, _utils.classNames)(enabledRandom ? "bg-indigo-600" : "bg-gray-200", "my-2 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500")
  }, /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true",
    className: (0, _utils.classNames)(enabledRandom ? "translate-x-5" : "translate-x-0", "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200")
  })));
}

function Controls(_ref3) {
  let {
    dimensions,
    setDimensions,
    enabledRandom,
    setEnabledRandom
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Range, {
    value: dimensions,
    onChange: setDimensions
  }), /*#__PURE__*/_react.default.createElement(BoardSwitch, {
    enabledRandom: enabledRandom,
    setEnabledRandom: setEnabledRandom
  }));
}