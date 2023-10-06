/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6D78F1',
        'newwhite': '#F9F9F9',
        'bgprimary': '#E4E4E4',
      },
    },
  },
  plugins: [],
}

