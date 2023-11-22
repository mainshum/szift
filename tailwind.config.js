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
        midnight: "rgba(66, 60, 102, 1)",
        grey: "rgba(233, 238, 242, 1)",
        purpleGrey: "rgba(89, 93, 123, 1)",
      },
      boxShadow: {
        level4: "box-shadow: 0px 16px 32px 0px rgba(30, 42, 50, 0.08)",
      },
      content: {
        dollar: 'url("/dollar.svg")',
      },
    },
  },
  plugins: [],
};
