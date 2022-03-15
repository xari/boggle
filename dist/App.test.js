"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _App = require("./App");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let dictionary;
Promise.resolve().then(() => _interopRequireWildcard(require("./dictionary_en_US.json"))).then(data => {
  dictionary = data.words.filter(word => word.length >= 3);
});
describe("the Results", () => {
  const board = ["v", "z", "g", "x", "j", "z", "g", "b", "t", "b", "j", "r", "u", "a", "c", "p"]; // Snapshots don't work here, because the time to solve the board is slightly different for each run

  it("render without any unexpected changes", () => {
    const results = (0, _utils.solve)((0, _utils.reduceLetters)(board), dictionary);

    const testRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_App.Results, {
      results: results
    }));

    const testInstance = testRenderer.root;
    testInstance.findAllByType("span").forEach((node, i) => expect(node.text).toEqual(results[i]));
  });
});