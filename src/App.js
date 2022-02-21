import React, { useEffect, useState, useMemo } from "react";
import { useAsyncMemo } from "use-async-memo";
import { solve, createRandomBoard } from "./boggle";

function Slider({ value, onChange }) {
  return (
    <div className="relative pt-1">
      <label className="form-label">Board Size</label>
      <input
        type="range"
        className="form-range appearance-none w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
        min="4"
        max="6"
        step="1"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function Game({ board }) {
  const boardDimension = board.length;

  return (
    <div className="col-span-2">
      <div className="m-auto flex">
        <div className={`grid grid-cols-${boardDimension} gap-3`}>
          {board
            .flatMap((letter) => letter)
            .map((x, i) => (
              <div
                key={i}
                className="flex h-28 w-28 p-4 border-4 content-center items-center text-center"
              >
                <span className="text-5xl w-full">{x}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function Results({ results }) {
  const { words, timeToSolve } = typeof results !== "undefined" && results;

  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-1 bg-cyan-100">
      {typeof timeToSolve !== "undefined" && (
        <p className="m-4 text-xl">
          It took <strong>{timeToSolve.toFixed(2)} milliseconds</strong> to
          solve this board
          <br />
          All possible words on the board are shown below.
        </p>
      )}
      <div className="flex flex-wrap p-2 w-full border border-slate-300">
        {typeof results !== "undefined" &&
          Array.from(words).map((word, i) => (
            <div
              key={i}
              className="m-2 px-5 py-3 text-md bg-red-100 rounded-lg"
            >
              {word}
            </div>
          ))}
      </div>
    </div>
  );
}

function App() {
  // Load the dictionary
  const dictionary = useAsyncMemo(
    async () =>
      await import("./dictionary_en_US.json").then((data) =>
        data.words.filter((word) => word.length >= 3)
      ),
    []
  );

  // Generate the board
  const [boardDimension, setBoardDimension] = useState(4);

  let board = useMemo(
    () => createRandomBoard(boardDimension),
    [boardDimension]
  );

  // Get the results
  const [results, setResults] = useState();

  useEffect(() => {
    dictionary && setResults(solve(board, dictionary));
  }, [board, dictionary, boardDimension]);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div className="col-span-1 bg-emerald-100">
        <Slider
          value={boardDimension}
          onChange={(e) => setBoardDimension(e.target.value)}
        />
      </div>
      <Game board={board} boardDimension={boardDimension} />
      <Results results={results} />
    </div>
  );
}

export default App;
