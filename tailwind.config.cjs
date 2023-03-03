/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        background: "#F1F5F9",
        gray1: "#1E293B", 
        black: "#1E293B"
      }
    },
  },
  plugins: [],
}
