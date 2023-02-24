const colors = require('./build/tailwind/semantic/colors.json');
const spacing = require('./build/tailwind/semantic/spacing.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors,
      spacing,
    }
  },
}
