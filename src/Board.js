import React, { useEffect } from "react";
import { classNames } from "./utils";
import { createRandomBoard } from "./utils";

function Custom({ setBoard, dimensions }) {
  useEffect(() => {
    return () => setBoard(createRandomBoard(dimensions)); // Generate a new random board on unmount
  }, []);

  const letterCount = dimensions * dimensions;
  const handleSubmit = (e) => {
    e.preventDefault();

    const board = [...e.target.elements.letter].reduce(
      ([acc, row], inputNode, i) => {
        const letter = inputNode.value;

        acc[row].push(letter.toLowerCase());

        if (i < letterCount - 1) {
          (i + 1) % dimensions === 0 && row++; // Increment the row every nth + 1 iteration
          return [acc, row];
        } else {
          return acc;
        }
      },
      [[...Array(dimensions).keys()].map((row) => []), 0] // Pre-fill the accumulator with empty "row" arrays
    );

    setBoard(board);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid grid-cols-${dimensions} gap-1`}
    >
      {[...Array(letterCount).keys()].map((i) => (
        <div
          key={i}
          className={classNames(
            dimensions === 4
              ? "h-28 w-28 text-5xl"
              : dimensions === 5
              ? "h-24 w-24 text-4xl"
              : "h-20 w-20 text-3xl",
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
          />
        </div>
      ))}
      <input
        type="submit"
        className="my-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        value="Boggle!"
      />
    </form>
  );
}

export function Random({ board, setBoard, dimensions }) {
  useEffect(() => {
    setBoard(createRandomBoard(dimensions)); // Generate a new random board if the dimensions change

    return () => setBoard(null); // Clear the board on unmount
  }, [dimensions]);

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
                  ? "h-28 w-28 text-5xl"
                  : dimensions === 5
                  ? "h-24 w-24 text-4xl"
                  : "h-20 w-20 text-3xl",
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
