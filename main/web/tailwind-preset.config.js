/* eslint-disable @typescript-eslint/no-var-requires */
const borderColors = require('../../src/tailwind/border-colors.json');
const boxShadow = require('../../src/tailwind/box-shadows.json');
const colors = require('../../src/tailwind/colors.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('../../src/tailwind/plugins/custom-props')],
  theme: {
    extend: {
      colors,
      borderColor: {
        ...colors,
        ...borderColors,
      },
      boxShadow,
    },
  },
};
