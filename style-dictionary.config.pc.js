const { filters, tailwindThemeFormatter, cssVariableFormatter, reactNativeThemeFormatter } = require("./helpers")

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  source: ['tokens/pc.json'],
  format: {
    ...tailwindThemeFormatter,
    ...cssVariableFormatter('pc'),
    // ...reactNativeThemeFormatter
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/cti/kebab'],
      buildPath: './css/',
      files: [
        {
          filter: filters.isColor,
          destination: 'pc/colors.css',
          format: 'createCSSVariableColor',
        },
        {
          filter: filters.isBorder,
          destination: 'pc/borders.css',
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
