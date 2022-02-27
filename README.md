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
- Shallow-rendering for testing the randomized parts of the UI.
- Mocked callback to test the form submission [`src/Board.test.js`](`src/Board.test.js`).

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
    "autoprefixer": "^10.4.2",
    "gh-pages": "^3.2.3",
    "postcss": "^8.4.6",
    "tailwindcss": "^3.0.23"
  }
}
```

## Parts of the codebase that I find fun and interesting

### `<App />` ([`src/App.js`](`src/App.js`))

All application state lives in this component.
Memoized callbacks are passed-down to nested components for them to update state with.

## Accessibility

I did a free audit of the app at [deque.com](https://audit.deque.com/), which passed for all checks, except for the following one about color-contrast.

> This page passed 28 of our checks.
> But, sorry to say we did find one critical or serious problem that will affect people with Low Vision and Color-blindness.
>
> The contrast between the text color and background color for one of the page's elements isn't high enough, making the text difficult to read.

I suspect this refers to the _"Boggle!"_ header, which uses the rather novel [`-webkit-text-stroke`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke), which the Deque test either doesn't account for, intentionally discounts it due to it's non-standard status.

![Accessibility audit preview](./accessibility-preview.png)
