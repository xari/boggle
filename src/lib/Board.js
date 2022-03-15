import React from "react";
import { classNames } from "./utils";

export default function Board({
  board,
  enabledRandom,
  setBoard,
  submitted,
  setSubmitted,
}) {
  const dimensions = Math.sqrt(board.length);
  const handleSubmit = (e) => {
    e.preventDefault(); // Avoid page refresh

    setSubmitted();
  };

  return (
    <div className="my-3 mx-auto flex">
      <form onSubmit={handleSubmit}>
        <fieldset disabled={enabledRandom ? "disabled" : ""}>
          <div className={`grid grid-cols-${dimensions} gap-1`}>
            {board.map((value, i, arr) => (
              <div
                key={i}
                className={classNames(
                  dimensions === 4
                    ? "h-24 sm:h-28 w-24 sm:w-28 text-3xl sm:text-4xl"
                    : dimensions === 5
                    ? "h-20 sm:h-24 w-20 sm:w-24 sm:text-2xl md:text-3xl"
                    : "h-16 sm:h-20 w-16 sm:w-20 sm:text-xl md:text-2xl",
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
