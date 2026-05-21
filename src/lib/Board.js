import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { classNames } from "./utils";

function getGridColsClass(dimensions) {
  if (dimensions === 4) {
    return "grid-cols-4";
  } else if (dimensions === 5) {
    return "grid-cols-5";
  }
  return "grid-cols-6";
}

function getCellSizeClass(dimensions) {
  if (dimensions === 4) {
    return "h-24 sm:h-28 w-24 sm:w-28 text-3xl sm:text-4xl";
  } else if (dimensions === 5) {
    return "h-20 sm:h-24 w-20 sm:w-24 sm:text-2xl md:text-3xl";
  }
  return "h-16 sm:h-20 w-16 sm:w-20 sm:text-xl md:text-2xl";
}

export default function Board({
  board,
  enabledRandom,
  setBoard,
  submitted,
  setSubmitted,
}) {
  const dimensions = Math.sqrt(board.length);
  const cellKeys = useMemo(
    () => board.map((_, i) => `cell-${i}`),
    [board.length]
  );
  const handleSubmit = (e) => {
    e.preventDefault(); // Avoid page refresh

    setSubmitted();
  };

  return (
    <div className="my-3 mx-auto flex">
      <form onSubmit={handleSubmit}>
        <fieldset disabled={enabledRandom ? "disabled" : ""}>
          <div
            className={classNames(
              getGridColsClass(dimensions),
              "grid gap-1"
            )}
          >
            {board.map((value, i, arr) => (
              <div
                key={cellKeys[i]}
                className={classNames(
                  getCellSizeClass(dimensions),
                  "flex border-2 content-center items-center text-center rounded"
                )}
              >
                <input
                  type="text"
                  name="letter"
                  className={classNames(
                    enabledRandom && "bg-neutral-50",
                    "h-full w-full font-light text-center focus:outline-none"
                  )}
                  maxLength="1"
                  pattern="[A-Za-z]"
                  required
                  aria-label="Boggle letter"
                  value={value}
                  onChange={(e) => {
                    submitted === true && setSubmitted(true); // true means reset

                    setBoard([
                      ...arr.slice(0, i),
                      e.target.value.toLowerCase(),
                      ...arr.slice(i + 1),
                    ]);
                  }}
                />
              </div>
            ))}
          </div>
        </fieldset>
        <input
          type="submit"
          className="my-3 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          value="Find all words"
          aria-label="Solve the board"
        />
      </form>
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.string).isRequired,
  enabledRandom: PropTypes.bool.isRequired,
  setBoard: PropTypes.func,
  submitted: PropTypes.bool,
  setSubmitted: PropTypes.func,
};
