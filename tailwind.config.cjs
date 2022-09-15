/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "bg-custom-background": "#131313",
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
      },
      animation: {
        fadeIn: "fadeIn .1s ease-in",
        fadeOut: "fadeIn .1s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    // ...
  ],
};
