const colors = require('./tailwind/colors.json');
const borderColors = require('./tailwind/border-colors.json');
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
        ...borderColors,
      },
      boxShadow
    }
  },
}
