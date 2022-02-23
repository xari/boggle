import React, { useEffect } from "react";
import { classNames } from "./utils";
import { createRandomBoard } from "./utils";

export function Custom({ setBoard, dimensions }) {
  useEffect(() => {
    setBoard(null); // Clears the results whenever the board is resized

    return () => setBoard(createRandomBoard(dimensions)); // Generates a new random board on unmount
  }, [setBoard, dimensions]);

  const letterCount = dimensions * dimensions;
  const handleSubmit = (e) => {
    e.preventDefault(); // Avoid page refresh

    const newBoard = [...e.target.elements.letter].reduce(
      ([acc, row], inputNode, i) => {
        const letter = inputNode.value;

        acc[row].push(letter.toLowerCase());

        if (i < letterCount - 1) {
          (i + 1) % dimensions === 0 && row++; // If 4 dimensions, new row every 5th item, .etc
          return [acc, row];
        } else {
          return acc; // When no more letters to reduce, return the accumulator
        }
      },
      [[...Array(dimensions).keys()].map((row) => []), 0] // Pre-fill the accumulator with empty "row" arrays
    );

    setBoard(newBoard);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`grid grid-cols-${dimensions} gap-1`}>
        {[...Array(letterCount).keys()].map((i) => (
          <div
            key={i}
            className={classNames(
              dimensions === 4
                ? "h-24 sm:h-28 w-24 sm:w-28 text-3xl sm:text-4xl"
                : dimensions === 5
                ? "h-20 sm:h-24 w-20 sm:w-24 sm:text-2xl md:text-3xl"
                : "h-16 sm:h-20 w-16 sm:w-20 sm:text-xl md:text-2xl",
              "flex p-3 border-2 content-center items-center text-center rounded"
            )}
          >
            <input
              type="text"
              name={`letter`}
              className="w-full font-light text-center focus:outline-none"
              maxLength="1"
              pattern="[A-Za-z]"
              required
              aria-label="Boggle letter"
            />
          </div>
        ))}
      </div>
      <input
        type="submit"
        className="my-2 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        value="Find all words"
        aria-label="Solve the board"
      />
    </form>
  );
}

export function Random({ board, setBoard, dimensions }) {
  useEffect(() => {
    setBoard(createRandomBoard(dimensions)); // Generate a new random board if the dimensions change

    return () => setBoard(null); // Clear the board on unmount
  }, [setBoard, dimensions]);

  return (
    <div className={`grid grid-cols-${dimensions} gap-1`}>
      {board &&
        board
          .flatMap((letter) => letter)
          .map((letter, i) => (
            <div
              key={i}
              className={classNames(
                dimensions === 4
                  ? "h-24 sm:h-28 w-24 sm:w-28 text-3xl sm:text-4xl"
                  : dimensions === 5
                  ? "h-20 sm:h-24 w-20 sm:w-24 sm:text-2xl md:text-3xl"
                  : "h-16 sm:h-20 w-16 sm:w-20 sm:text-xl md:text-2xl",
                "flex p-3 border-2 content-center items-center text-center rounded"
              )}
            >
              <span className="w-full font-light">{letter}</span>
            </div>
          ))}
    </div>
  );
}

export default function Board({ enableRandom, ...props }) {
  return (
    <div className="my-3 mx-auto flex">
      {enableRandom === true ? <Random {...props} /> : <Custom {...props} />}
    </div>
  );
}
