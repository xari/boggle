// https://gist.github.com/JonnoFTW/fbdc5079174c3bb448e0951de9ebbe94#file-boggle_solver-js

var TrieNode = function (parent, value) {
  this.parent = parent;
  this.children = new Array(26);
  this.isWord = false;
  if (parent !== undefined) {
    parent.children[value.charCodeAt(0) - 97] = this;
  }
};

var MakeTrie = function (dict) {
  var root = new TrieNode(undefined, "");
  // console.log(root);
  for (let word of dict.values()) {
    var curNode = root;

    for (var i = 0; i < word.length; i++) {
      var letter = word[i];
      var ord = letter.charCodeAt(0);
      if (97 <= ord < 123) {
        // console.log(curNode);
        var nextNode = curNode.children[ord - 97];
        if (nextNode === undefined) {
          nextNode = new TrieNode(curNode, letter);
        }
        curNode = nextNode;
      }
    }
    curNode.isWord = true;
  }
  return root;
};

var BoggleWords = function (grid, dict, mustHave) {
  var rows = grid.length;
  var cols = grid[0].length;
  var queue = [];
  var words = new Set();

  for (var y = 0; y < cols; y++) {
    for (var x = 0; x < rows; x++) {
      var c = grid[y][x];
      var ord = c.charCodeAt(0);
      var node = dict.children[ord - 97];

      if (node !== undefined) {
        queue.push([x, y, c, node, [[x, y]]]);
      }
    }
  }

  while (queue.length !== 0) {
    var [x, y, s, node, h] = queue.pop();
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
      var [x2, y2] = [x + dx, y + dy];
      if (
        h.find(function (el) {
          return el[0] === x2 && el[1] === y2;
        }) !== undefined
      ) {
        continue;
      }

      // console.log(x2,y2, h);
      if (0 <= x2 && x2 < cols && 0 <= y2 && y2 < rows) {
        var newHist = h.slice();
        newHist.push([x2, y2]);
        var s2 = s + grid[y2][x2];
        var node2 = node.children[grid[y2][x2].charCodeAt(0) - 97];
        if (node2 !== undefined) {
          // console.log(s2);
          if (node2.isWord) {
            if (mustHave === undefined || s2.indexOf(mustHave) !== -1)
              words.add(s2);

            // console.log(newHist, s2);
          }
          queue.push([x2, y2, s2, node2, newHist]);
        }
      }
    }
  }

  return words;
};

export default function solve(board, dictionary) {
  var d = new MakeTrie(new Set(dictionary));

  const grid = board.map((row) => row.join(""));

  const timeStart = performance.now();
  const words = BoggleWords(grid, d);
  const timeToSolve = performance.now() - timeStart;

  return { words, timeToSolve };
}
