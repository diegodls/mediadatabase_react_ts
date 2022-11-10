/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
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
    require("tailwind-scrollbar-hide"),
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
};
