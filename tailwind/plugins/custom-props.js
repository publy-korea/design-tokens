const plugin = require('tailwindcss/plugin');
const borders = require('../borders.json');
const fonts = require('../fonts.json');

const borderKeys = Object.keys(borders);
const fontKeys = Object.keys(fonts);

module.exports = plugin(function ({ matchUtilities }) {
  matchUtilities(
    {
      bdr: value => ({
        border: borders[value],
      }),
    },
    {
      values: Object.fromEntries(borderKeys.map(key => [key, key])),
    },
  );
  matchUtilities(
    {
      typo: value => ({
        font: fonts[value],
      }),
    },
    {
      values: Object.fromEntries(fontKeys.map(key => [key, key])),
    },
  );
});
