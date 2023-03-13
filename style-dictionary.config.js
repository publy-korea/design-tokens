const setWith = require('lodash.setwith');

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  source: ["tokens/global.json"],
  format: {
    createTailwindTheme: ({ dictionary }) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        setWith(theme, token.path.join('.'), token.value, Object);
      });
      return JSON.stringify(theme, undefined, 2);
    }
  },
  platforms: {
    tailwind: {
      transforms: ["attribute/cti", "name/cti/kebab"],
      buildPath: 'build/tailwind/global/',
      files: [{
        filter: (token) => {
          return token.type === 'color'
        },
        destination: 'colors.json',
        format: "createTailwindTheme"
      }]
    },
  }
}