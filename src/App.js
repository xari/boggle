import React, { useCallback, useEffect, useState } from "react";
import { useAsyncMemo } from "use-async-memo";
import Controls from "./Controls";
import Board from "./Board";
import {
  solve,
  createEmptyBoard,
  createRandomBoard,
  reduceLetters,
} from "./utils";
import "./App.css";

export function Results({ results }) {
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
  // Load and memoize the dictionary
  const dictionary = useAsyncMemo(
    async () =>
      await import("./dictionary_en_US.json").then((data) =>
        data.words.filter((word) => word.length >= 3)
      ),
    []
  );

  // State
  const [dimensions, setDimensions] = useState(4);
  const [enabledRandom, setEnabledRandom] = useState(false);
  const [board, setBoard] = useState(createEmptyBoard(dimensions));
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  // When the settings change...
  useEffect(() => {
    setSubmitted(false);
    setResults(null);
    enabledRandom // Refresh the board
      ? setBoard(createRandomBoard(dimensions))
      : setBoard(createEmptyBoard(dimensions));
  }, [enabledRandom, dimensions]);

  // When submitted...
  useEffect(() => {
    if (dictionary && submitted === true)
      setResults(solve(reduceLetters(board), dictionary));
  }, [board, submitted, dictionary]);

  // Controlled & memoized state updaters
  const updateDimensions = useCallback(
    (e) => setDimensions(parseInt(e.target.value)),
    [setDimensions]
  );
  const updateEnabledRandom = useCallback(
    () => setEnabledRandom(!enabledRandom),
    [enabledRandom, setEnabledRandom]
  );
  const updateBoard = useCallback(
    (newBoard) => {
      setBoard(newBoard);
    },
    [setBoard]
  );
  const updateSubmitted = useCallback(() => setSubmitted(true), [setSubmitted]);

  return (
    <div className="my-8 mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8">
      <h1 className="mt-5 mb-8 text-8xl text-center text-emerald-500 font-stroke font-typewriter">
        Boggle!
      </h1>
      <Controls
        dimensions={dimensions}
        setDimensions={updateDimensions}
        enabledRandom={enabledRandom}
        setEnabledRandom={updateEnabledRandom}
      />
      <Board
        board={board}
        enabledRandom={enabledRandom}
        setBoard={updateBoard}
        setSubmitted={updateSubmitted}
      />
      <Results results={results} />
    </div>
  );
}

export default App;
