# Boggle!

![Screenshot of the app](./preview.png)

## Features

- Create and solve your own Boggle board, or let the app generate and solve one for you.
- Resize the playable grid to any of the following:
  - 4 x 4
  - 5 x 5
  - 6 x 6
- Keyboard navigation/accessibility
- Responsive layout

## Instructions

- Installation
  - `npm install`
- Start Dev server
  - `npm start`
- Testing
  - `npm run test`

## Tests

- Unit tests for the core business logic.
- Snapshots for the non-randomized or dynamic parts of the UI.
- Shallow-rendering for testing the randomized Boggle board.

## Dependencies

```json
{
  "dependencies": {
    "@headlessui/react": "^1.5.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "5.0.0",
    "use-async-memo": "^1.2.3"
  },
  "devDependencies": {
    "@wojtekmaj/enzyme-adapter-react-17": "^0.6.6",
    "autoprefixer": "^10.4.2",
    "enzyme": "^3.11.0",
    "gh-pages": "^3.2.3",
    "postcss": "^8.4.6",
    "tailwindcss": "^3.0.23"
  }
}
```

## Parts of the codebase that I find fun and interesting

### `<App />` component ([`src/App.js`](`src/App.js`))

Most application state lives in this component, and memoized callbacks are passed-down the component tree for nested components to update state.

### `reduceLetters()` component ([`src/utils.js`](`src/utils.js`))

This is a higher-order function that is used to reduce the array of input values (`["a", "b", "c", ...]`) into an array that uses the "board" structure (`[["a", "b", "c", ...], ["d", "e", ...], ...]`).
This component renders a series of form inputs representing each letter on the board.
There's also a unit test for it that you can find in [`src/utils.test.js`](`src/utils.test.js`).

## A note about accessibility

I did a free audit of the app at [deque.com](https://audit.deque.com/), which passed for all checks, except for the following one about color-contrast.

> This page passed 28 of our checks.
> But, sorry to say we did find one critical or serious problem that will affect people with Low Vision and Color-blindness.

This may refer to the page header, which uses the rather novel `-webkit-text-stroke`, which may not be accounted for in the Deque test.
It's possible that this also refers to the submit button.

![Accessibility audit preview](./accessibility-preview.png)
