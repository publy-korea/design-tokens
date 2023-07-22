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
    },
    createReactNativeTheme: ({dictionary}) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        const [first, ...rest] = token.path;
        const keys = [first, ...rest.map(key => key.charAt(0).toUpperCase() + key.slice(1))];
        theme[keys.join('')] = token.value;
      });

      return `export default ${JSON.stringify(theme, undefined, 2)} as const`;
    }
  },
  platforms: {
    tailwind: {
      transforms: ['attribute/cti', 'name/cti/kebab'],
      buildPath: './tailwind/global/',
      files: [{
        filter: isColor,
        destination: 'colors.json',
        format: 'createTailwindTheme'
      }]
    },
    rn: {
      transformGroup: 'react-native',
      buildPath: './react-native/global/',
      files: [{
        filter: isColor,
        destination: 'colors.ts',
        format: 'createReactNativeTheme'
      }]
    }
  }
}