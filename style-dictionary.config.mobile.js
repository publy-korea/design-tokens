const { filters, tailwindThemeFormatter, cssVariableFormatter, reactNativeThemeFormatter } = require("./lib/style-dictionary")

const MODE = 'mobile'

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  source: [`tokens/${MODE}.json`],
  format: {
    ...tailwindThemeFormatter,
    ...cssVariableFormatter(MODE),
    ...reactNativeThemeFormatter
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
          filter: filters.isBorder,
          destination: `${MODE}/border-colors.css`,
          format: 'createCSSVariableBorderColor',
        },
        {
          filter: filters.isBoxShadow,
          destination: `${MODE}/box-shadows.css`,
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
          filter: filters.isBorder,
          destination: 'border-colors.json',
          format: 'createTailwindThemeBorderColor',
        },
        {
          filter: filters.isBoxShadow,
          destination: 'box-shadows.json',
          format: 'createTailwindThemeBoxShadow',
        },
      ],
    },
    rn: {
      transformGroup:'react-native',
      buildPath: './react-native/',
      files: [
        {
          filter: filters.isColor,
          destination: 'colors.ts',
          format: 'createReactNativeThemeColor',
        },
        {
          filter: filters.isBorder,
          destination: 'border-colors.ts',
          format: 'createReactNativeThemeBorderColor',
        },
      ],
    },
  },
};
