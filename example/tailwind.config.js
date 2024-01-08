/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../main/web/tailwind.config')],
  prefix: 'tw-',
  content: ['./example/index.html'],
};
