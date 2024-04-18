/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redFood: "#f01543",
      },
    },
  },
  plugins: [require("daisyui")],
};
