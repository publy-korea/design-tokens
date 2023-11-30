const { filters, tailwindThemeFormatter, cssVariableFormatter, reactNativeThemeFormatter } = require("./lib/style-dictionary")

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  source: ['tokens/mobile.json'],
  format: {
    ...tailwindThemeFormatter,
    ...cssVariableFormatter('mobile'),
    // ...reactNativeThemeFormatter
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/cti/kebab'],
      buildPath: './css/',
      files: [
        {
          filter: filters.isColor,
          destination: 'mobile/colors.css',
          format: 'createCSSVariableColor',
        },
        {
          filter: filters.isBorder,
          destination: 'mobile/borders.css',
          format: 'createCSSVariableBorder',
        },
      ],
    },
    tailwind: {
      transforms: ['attribute/cti', 'name/cti/kebab'],
      buildPath: './tailwind/',
      files: [
        {
          filter: filters.isColor,
          destination: 'colors.json',
          format: 'createTailwindThemeColor',
        },
        {
          filter: filters.isBorder,
          destination: 'borders.json',
          format: 'createTailwindThemeBorder',
        },
      ],
    },
  },
};
