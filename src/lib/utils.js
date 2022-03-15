export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function reduceLetters(letters) {
  const dimensions = Math.sqrt(letters.length);

  return letters.reduce(
    ([acc, row], letter, i, arr) => {
      acc[row].push(letter);

      if (i < arr.length - 1) {
        (i + 1) % dimensions === 0 && row++; // If 4 dimensions, new row every 5th item, .etc
        return [acc, row];
      } else {
        return acc; // When no more letters to reduce, return the accumulator
      }
    },
    [[...Array(dimensions).keys()].map((row) => []), 0] // Pre-fill the accumulator with empty arrays, representing board rows
  );
}

export const createRandomBoard = (dimensions) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  return [...Array(dimensions * dimensions)].map(
    (x) => alphabet[Math.floor(Math.random() * alphabet.length)]
  );
};

export const createEmptyBoard = (dimensions) => [
  ...Array(dimensions * dimensions)
    .join(".")
    .split("."),
];

// I derived this Trie/DFS approach from the following GitHub Gist.
// I refactored it to clean-up the overall syntax, and to add my own comments about how it works.
//
// https://gist.github.com/JonnoFTW/fbdc5079174c3bb448e0951de9ebbe94#file-boggle_solver-js

const TrieNode = function (parent, value) {
  this.parent = parent;
  this.children = new Array(26); // 26 letters in the alphabet, so there will be 26 leaves in the trie
  this.isWord = false;

  // Check whether is root
  if (typeof parent !== "undefined") {
    parent.children[value.charCodeAt(0) - 97] = this; // https://stackoverflow.com/questions/22624379/how-to-convert-letters-to-numbers-with-javascript
  }
};

// Fills-out the trie with the dictionary words
const MakeTrie = function (dict) {
  const root = new TrieNode(undefined, "");

  // Loop through dictionary words
  for (let word of dict.values()) {
    let curNode = root;

    // Loop through the letters in each word
    for (let i = 0; i < word.length; i++) {
      const curLetter = word[i];
      const code = curLetter.charCodeAt(0) - 97;

      // Make sure the character is in a-z
      if (96 < code < 123) {
        let nextNode = curNode.children[code];

        // Don't repeat characters!
        if (typeof nextNode === "undefined") {
          nextNode = new TrieNode(curNode, curLetter);
        }

        curNode = nextNode;
      }
    }

    curNode.isWord = true;
  }

  return root;
};

const boggle = function (grid, dict, mustHave) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  const words = new Set(); // Set will discard any duplicate words

  // Fill-up the queue
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      const curLetter = grid[y][x];
      const code = curLetter.charCodeAt(0);
      const node = dict.children[code - 97]; // Get code relative to "a"

      // Make sure that the dictionary contains a word beginning with the current letter
      if (typeof node !== "undefined") {
        queue.push([x, y, curLetter, node, [[x, y]]]); // [x, y] === board position
      }
    }
  }

  while (queue.length !== 0) {
    const [x, y, s, node, h] = queue.pop(); // s stands for "string", h stands for "history"

    // Loop through the eight adjacent board positions
    for (let [dx, dy] of [
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ]) {
      const [x2, y2] = [x + dx, y + dy];

      // Make the next move is on the board
      if (typeof h.find((el) => el[0] === x2 && el[1] === y2) !== "undefined") {
        continue;
      }

      if (0 <= x2 && x2 < cols && 0 <= y2 && y2 < rows) {
        const newHist = h.slice();

        newHist.push([x2, y2]); // Push the next move to the history

        const s2 = s + grid[y2][x2]; // Concat the next letter to the word string
        const node2 = node.children[grid[y2][x2].charCodeAt(0) - 97]; // Make sure there's a next word

        if (typeof node2 !== "undefined") {
          if (node2.isWord) {
            // This mustHave flag allows a letter to be specified; not actually necessary for the Rstudio exercise
            if (typeof mustHave === "undefined" || s2.indexOf(mustHave) !== -1)
              words.add(s2);
          }

          // Push the new item to the queue
          queue.push([x2, y2, s2, node2, newHist]);
        }
      }
    }
  }

  return words;
};

export function solve(board, dictionary) {
  var d = new MakeTrie(new Set(dictionary));

  const grid = board.map((row) => row.join(""));

  const timeStart = performance.now();
  const words = boggle(grid, d);
  const timeToSolve = performance.now() - timeStart;

  return { words, timeToSolve };
}
