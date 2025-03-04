/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        instrument:["Nunito Sans", "serif"],
      }
    },
  },
  plugins: [],
};
