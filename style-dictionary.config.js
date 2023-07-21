const setWith = require('lodash.setwith');

/**
 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
 */
function isColor(token) {
  return token.type === 'color'
}

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  source: ['tokens/global.json'],
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
      transforms: ['attribute/cti', 'name/cti/kebab'],
      buildPath: 'build/tailwind/global/',
      files: [{
        filter: isColor,
        destination: 'colors.json',
        format: 'createTailwindTheme'
      }]
    },
    rn: {
      transformGroup: 'react-native',
      buildPath: './build/react-native/global/',
      files: [{
        filter: isColor,
        destination: 'colors.ts',
        format: 'javascript/es6'
      }]
    }
  }
}