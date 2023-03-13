const colors = require('./build/tailwind/global/colors.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors,
    }
  },
}
