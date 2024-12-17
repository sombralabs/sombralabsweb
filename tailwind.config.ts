import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1900px",
        ...defaultTheme.screens,
        xs: "420px",
      },

      fontFamily: {
        archivo: "Archivo",
      },

      backgroundImage: {
        purpleGr: "linear-gradient(to left, #FF00F5, #AD00FF)",
        purpleBlackGr: "linear-gradient(to right, #7F00E1, #1D1D1D, #BC02E0)",
      },

      keyframes: {
        gradientIn: {
          "0%": {
            transform: "translateX(-100vw)",
            width: "100%",
            opacity: "0",
          },
          "80%": { transform: "", width: "50%", opacity: "1" },
          "100%": {
            transform: "translateX(-40vw)",
            width: "10%",
            opacity: "0",
          },
        },
        gradientInRight: {
          "0%": { transform: "translateX(100vw)", width: "100%", opacity: "0" },
          "80%": { transform: "", width: "50%", opacity: "1" },
          "100%": { transform: "translateX(40vw)", width: "10%", opacity: "0" },
        },
      },
    },
    animation: {
      "gradient-in-left": "gradientIn 5s ease-in-out infinite",
      "gradient-in-right": "gradientInRight 5s ease-in-out infinite",
    },
  },
  plugins: [],
};
export default config;
