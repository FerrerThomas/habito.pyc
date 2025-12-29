/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ec9213",
        "primary-content": "#ffffff",
        "secondary": "#9a794c",
        "background-light": "#fcfaf8", // Merged: used the one from menu which seems more specific
        "background-card": "#ffffff",
        "background-dark": "#221a10",
        "text-main": "#1b160d",
        "text-light": "#9a794c",
        "border-subtle": "#e6e0d9",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}
