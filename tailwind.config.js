const colors = require('./tailwind/colors.json');
const boxShadow = require('./tailwind/global/box-shadows.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors,
      boxShadow
    }
  },
}
