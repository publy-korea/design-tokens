const { filters, tailwindThemeFormatter, cssVariableFormatter, reactNativeThemeFormatter } = require("./lib/style-dictionary")

const MODE = 'mobile'

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  source: [`tokens/${MODE}.json`],
  format: {
    ...tailwindThemeFormatter,
    ...cssVariableFormatter(MODE),
    // ...reactNativeThemeFormatter
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/cti/kebab'],
      buildPath: './css/',
      files: [
        {
          filter: filters.isColor,
          destination: `${MODE}/colors.css`,
          format: 'createCSSVariableColor',
        },
        {
          filter: filters.isBorder,
          destination: `${MODE}/borders.css`,
          format: 'createCSSVariableBorder',
        },
        {
          filter: filters.isBoxShadow,
          destination: `${MODE}/boxShadows.css`,
          format: 'createCSSVariableBoxShadow',
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
        {
          filter: filters.isBoxShadow,
          destination: 'boxShadows.json',
          format: 'createTailwindThemeBoxShadow',
        },
      ],
    },
  },
};
