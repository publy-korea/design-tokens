const colors = require('./tailwind/colors.json');
// const borders = require('./tailwind/borders.json');
const borderColor = require('./tailwind/border-colors.json');
const boxShadow = require('./tailwind/box-shadows.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('./tailwind/plugins/custom-props')
  ],
  theme: {
    extend: {
      colors,
      borderColor: {
        ...colors,
        ...borderColor,
      },
      // borders,
      boxShadow
    }
  },
}
