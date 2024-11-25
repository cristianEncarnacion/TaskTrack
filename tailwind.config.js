/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".grid-areas-custom": {
          display: "grid",
          "grid-template-areas":
            '"sidebar content content" "sidebar content content" "sidebar content content"',
        },
      });
    }),
  ],
};
