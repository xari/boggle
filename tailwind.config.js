module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    content: ["./src/**/*.{js,jsx}"],
    safelist: [
      "grid-cols-3",
      "grid-cols-4",
      "grid-cols-5",
      "grid-cols-6",
      "grid-cols-7",
      "grid-cols-8",
      "grid-cols-9",
      "grid-cols-10",
      "grid-cols-11",
      "grid-cols-12",
    ],
  },
};
