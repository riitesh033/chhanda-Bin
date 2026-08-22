/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        ink: "#241f1a",
        parchment: "#f7f1e5",
        saffron: "#c7792f",
        gold: "#d6a84f",
        maroon: "#7b2d26",
      },

      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },

  plugins: [],
};