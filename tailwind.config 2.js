/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Sora': ['Sora', 'sans-serif'],
        },
    extend: {},
  },
  plugins: [require('daisyui')],
}
