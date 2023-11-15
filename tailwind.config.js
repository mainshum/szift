/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "rgba(77, 100, 117, 1)",
        white: "rgba(255, 255, 255, 1)",
        stroke: "rgba(244, 248, 250, 1)",
        salmon: "rgba(255, 219, 203, 1)",
      },
    },
  },
  plugins: [],
};
