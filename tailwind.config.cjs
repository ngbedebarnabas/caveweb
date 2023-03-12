/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("autoprefixer")],
  daisyui: {
    themes: ["light", "dark", "night", "winter"],
    darkTheme: "night",
  },
};
