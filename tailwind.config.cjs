/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js,ts}", "./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#f9f1f0",
        secondary: "#fadcd9",
        white: "#ffffff",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
