/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(20,184,166)',
        secondary: 'rgb(99,102,241)',
        accent: 'rgb(6,182,212)'
      }
    },
  },
  plugins: [],
}
