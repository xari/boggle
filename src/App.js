import React, { useEffect, useState } from "react";
import { useAsyncMemo } from "use-async-memo";
import Controls from "./Controls";
import Board from "./Board";
import { solve, createRandomBoard } from "./utils";
import "./App.css";

function Results({ board }) {
  // Load and memoize the dictionary
  const dictionary = useAsyncMemo(
    async () =>
      await import("./dictionary_en_US.json").then((data) =>
        data.words.filter((word) => word.length >= 3)
      ),
    []
  );

  const [results, setResults] = useState(null);

  useEffect(() => {
    dictionary && setResults(board !== null ? solve(board, dictionary) : null);
  }, [board, dictionary]);

  const { words, timeToSolve } = results !== null && results;

  return (
    <div className="my-5">
      {typeof timeToSolve !== "undefined" && (
        <p className="text-lg">
          It took{" "}
          <span className="font-semibold">
            {timeToSolve.toFixed(2)} milliseconds
          </span>{" "}
          to solve this board
          <br />
          All possible words on the board are shown below.
        </p>
      )}
      <div className="flex flex-wrap py-2 -mx-1 w-full">
        {typeof words !== "undefined" &&
          Array.from(words).map((word, i) => (
            <div
              key={i}
              className="m-1 px-2 py-0 text-sm font-light text-emerald-800 bg-gray-100 border border-emerald-800 rounded-lg"
            >
              {word}
            </div>
          ))}
      </div>
    </div>
  );
}

function App() {
  // State
  const [dimensions, setDimensions] = useState(4);
  const [enableRandom, setEnableRandom] = useState(true);
  const [board, setBoard] = useState(createRandomBoard(dimensions));

  // Controlled state updaters
  const updateDimensions = (e) => setDimensions(parseInt(e.target.value));
  const updateEnableRandom = () => setEnableRandom(!enableRandom);
  const updateBoard = (newBoard) => {
    setBoard(newBoard);
  };

  return (
    <div className="my-8 mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8">
      <h1 className="mt-5 mb-8 text-8xl text-center text-emerald-500">
        Boggle!
      </h1>
      <Controls
        dimensions={dimensions}
        setDimensions={updateDimensions}
        enableRandom={enableRandom}
        setEnableRandom={updateEnableRandom}
      />
      <Board
        board={board}
        setBoard={updateBoard}
        dimensions={dimensions}
        enableRandom={enableRandom}
      />
      <Results board={board} />
    </div>
  );
}

export default App;
