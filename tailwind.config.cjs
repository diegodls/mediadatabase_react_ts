/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const listSM = "10rem";
const listMD = "15rem";
const headerHeight = "2.5rem"; //40px
const layoutX = "1rem";

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    maxWidth: {
      CustomMaxWidth: "1280px",
    },
    maxHeight: {
      "list-sm": listSM,
      "list-md": listMD,
    },
    extend: {
      height: {
        "list-sm": listSM,
        "list-md": listMD,
        headerHeight: headerHeight,
      },
      margin: {
        headerHeight: headerHeight,
        layoutX: layoutX,
      },
      padding: {
        layoutX: layoutX,
      },
      colors: {
        "customColors-background": "#131313",
        "customColors-red-500": "#cc0000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        fadeOut: {
          "0%": { opacity: 100 },
          "100%": { opacity: 0 },
        },

        diagonalMove: {
          "0%": {
            transform: "translate(-14rem, -18rem)",
          },
          "100%": {
            transform: "translate(14rem, 18rem)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn .2s ease-in",
        fadeOut: "fadeOut .2s ease-out",
        diagonalMove: "diagonalMove 1s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar": {
          "-ms-overflow-style": "none" /*  IE and Edge   */,
          "scrollbar-width": "none" /*  Firefox   */,
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
