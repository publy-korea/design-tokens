const set = require('lodash.set');

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  source: ["tokens/semantic.json"],
  format: {
    createTailwindTheme: ({ dictionary }) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        set(theme, token.path.join('.'), token.value);
      });
      return JSON.stringify(theme, undefined, 2);
    }
  },
  transform: {
    'sizes/px': {
      type: 'value',
      matcher: (prop) => {
        // You can be more specific here if you only want 'em' units for font sizes
        return ["fontSizes", "spacing", "borderRadius", "borderWidth", "sizing"].includes(prop.attributes.category);
      },
      transformer: (prop) => {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(prop.original.value) + 'px';
      },
    }
  },
  platforms: {
    tailwind: {
      transforms: ["attribute/cti", "name/cti/kebab", "sizes/px"],
      buildPath: 'build/tailwind/semantic/',
      files: [{
        filter: (token) => {
          return token.attributes.type === 'color'
        },
        destination: 'colors.json',
        format: "createTailwindTheme"
      }, {
        filter: (token) => {
          return token.attributes.type === 'spacing'
        },
        destination: 'spacing.json',
        format: "createTailwindTheme"
      }]
    },
  }
}