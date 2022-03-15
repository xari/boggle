"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Results = Results;
exports.default = void 0;

require("core-js/modules/es.number.to-fixed.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.parse-int.js");

var _react = _interopRequireWildcard(require("react"));

var _useAsyncMemo = require("use-async-memo");

var _Controls = _interopRequireDefault(require("./Controls"));

var _Board = _interopRequireDefault(require("./Board"));

var _utils = require("./utils");

require("./App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Results(_ref) {
  let {
    results
  } = _ref;
  const {
    words,
    timeToSolve
  } = results !== null && results;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "my-5"
  }, typeof timeToSolve !== "undefined" && /*#__PURE__*/_react.default.createElement("p", {
    className: "text-lg"
  }, "It took", " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "font-semibold"
  }, timeToSolve.toFixed(2), " milliseconds"), " ", "to solve this board", /*#__PURE__*/_react.default.createElement("br", null), "All possible words on the board are shown below."), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-wrap py-2 -mx-1 w-full"
  }, typeof words !== "undefined" && Array.from(words).map((word, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: i,
    className: "m-1 px-2 py-0 text-sm font-light text-emerald-800 bg-gray-100 border border-emerald-800 rounded-lg"
  }, word))));
}

function App() {
  // Load and memoize the dictionary
  const dictionary = (0, _useAsyncMemo.useAsyncMemo)(async () => await Promise.resolve().then(() => _interopRequireWildcard(require("./dictionary_en_US.json"))).then(data => data.words.filter(word => word.length >= 3)), []); // State

  const [dimensions, setDimensions] = (0, _react.useState)(4);
  const [enabledRandom, setEnabledRandom] = (0, _react.useState)(false);
  const [board, setBoard] = (0, _react.useState)((0, _utils.createEmptyBoard)(dimensions));
  const [submitted, setSubmitted] = (0, _react.useState)(false);
  const [results, setResults] = (0, _react.useState)(null); // When the settings change...

  (0, _react.useEffect)(() => {
    setSubmitted(false);
    setResults(null);
    enabledRandom // Refresh the board
    ? setBoard((0, _utils.createRandomBoard)(dimensions)) : setBoard((0, _utils.createEmptyBoard)(dimensions));
  }, [enabledRandom, dimensions]); // Runs when submitted...
  // or when one of the text inputs is updated after a submission.

  (0, _react.useEffect)(() => {
    dictionary && submitted === true ? setResults((0, _utils.solve)((0, _utils.reduceLetters)(board), dictionary)) : setResults(null);
  }, [board, submitted, dictionary]); // Controlled & memoized state updaters

  const updateDimensions = (0, _react.useCallback)(e => setDimensions(parseInt(e.target.value)), [setDimensions]);
  const updateEnabledRandom = (0, _react.useCallback)(() => setEnabledRandom(!enabledRandom), [enabledRandom, setEnabledRandom]);
  const updateBoard = (0, _react.useCallback)(newBoard => {
    setBoard(newBoard);
  }, [setBoard]);
  const updateSubmitted = (0, _react.useCallback)(reset => reset === true ? setSubmitted(false) : setSubmitted(!submitted), [submitted, setSubmitted]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "my-8 mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "mt-5 mb-8 text-8xl text-center text-emerald-500 font-stroke font-typewriter"
  }, "Boggle!"), /*#__PURE__*/_react.default.createElement(_Controls.default, {
    dimensions: dimensions,
    setDimensions: updateDimensions,
    enabledRandom: enabledRandom,
    setEnabledRandom: updateEnabledRandom
  }), /*#__PURE__*/_react.default.createElement(_Board.default, {
    board: board,
    enabledRandom: enabledRandom,
    setBoard: updateBoard,
    submitted: submitted,
    setSubmitted: updateSubmitted
  }), /*#__PURE__*/_react.default.createElement(Results, {
    results: results
  }));
}

var _default = App;
exports.default = _default;