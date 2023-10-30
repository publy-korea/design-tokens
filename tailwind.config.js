const colors = require('./tailwind/global/colors.json');
const borderColors = require('./tailwind/global/border-colors.json');
const boxShadow = require('./tailwind/global/box-shadows.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        ...colors,
        ...borderColors
      },
      boxShadow
    }
  },
}
