/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        dark1: "#000814",
        dark2: "#001d3d",
        dark3: "#003566",
        accent1: "#ffc300",
        accent2: "#ffd60a",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
