import React from "react";
import { Switch } from "@headlessui/react";
import { classNames } from "./utils";
import "./Controls.css";

function Range({ value, onChange }) {
  return (
    <div className="my-2">
      <span className="flex-grow flex flex-col">
        <label className="text-md font-medium text-gray-900">Board size</label>
        <span className="text-sm text-gray-500">
          Slide the bar to resize the board.
        </span>
      </span>
      <input
        type="range"
        min="4"
        max="6"
        step="1"
        value={value}
        onChange={onChange}
        aria-label="Boggle board size"
      />
    </div>
  );
}

function BoardSwitch({ enabledRandom, setEnabledRandom }) {
  return (
    <Switch.Group as="div">
      <span className="flex-grow flex flex-col">
        <Switch.Label
          as="span"
          className="text-md font-medium text-gray-900"
          passive
        >
          Solve an auto-generated board instead
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          Toggle between an auto-generated board and a customizable one.
        </Switch.Description>
      </span>
      <Switch
        checked={enabledRandom}
        onChange={setEnabledRandom}
        className={classNames(
          enabledRandom ? "bg-indigo-600" : "bg-gray-200",
          "my-2 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabledRandom ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}

export default function Controls({
  dimensions,
  setDimensions,
  enabledRandom,
  setEnabledRandom,
}) {
  return (
    <>
      <Range value={dimensions} onChange={setDimensions} />
      <BoardSwitch
        enabledRandom={enabledRandom}
        setEnabledRandom={setEnabledRandom}
      />
    </>
  );
}
