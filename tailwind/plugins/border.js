const plugin = require('tailwindcss/plugin')
const borders = require('../borders.json')

module.exports = plugin(function ({matchUtilities}) {
  matchUtilities({
    bdr: value => ({
      border: borders[value]
    })
  }, {
    values: {
      'border-color-button-completed': 'border-color-button-completed'
    }
  })
})