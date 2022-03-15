"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe("A random Boggle board", () => {
  const dimensions = 3;
  const board = (0, _utils.createRandomBoard)(dimensions);
  test("it should have the correct dimensions", () => {
    expect(board).toHaveLength(dimensions * dimensions);
  });
  test("it should reduce to the board structure", () => {
    const structuredBoard = (0, _utils.reduceLetters)(board);
    expect(structuredBoard).toHaveLength(dimensions);
    structuredBoard.forEach(col => expect(col).toHaveLength(dimensions));
  });
});
let dictionary;
Promise.resolve().then(() => _interopRequireWildcard(require("./dictionary_en_US.json"))).then(data => {
  dictionary = data.words.filter(word => word.length >= 3);
});
describe("finding specific words in a Boggle board", () => {
  const board = [["v", "z", "g", "x"], ["j", "z", "g", "b"], ["t", "b", "j", "r"], ["u", "a", "c", "p"]];
  const testWords = ["cab", "cat", "abt", "abu", "abc", "abut", "uta", "ubc", "jab", "jat"];
  test("the board contains the words", () => {
    const {
      words
    } = (0, _utils.solve)(board, dictionary);
    testWords.forEach(word => expect([...words]).toContain(word));
  });
});
describe("Reducing the board's input values", () => {
  const dimensions = 3;
  const inputCount = dimensions * dimensions;
  const inputArr = [...Array(inputCount).keys()].map(letter => ({
    value: letter
  }));
  const board = (0, _utils.reduceLetters)(inputArr);
  test("The created board to have the right dimensions", () => {
    expect(board.length).toEqual(dimensions);
    board.forEach(row => expect(row.length).toEqual(dimensions));
  });
});