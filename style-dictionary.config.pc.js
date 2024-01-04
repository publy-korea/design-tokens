const { filters, tailwindThemeFormatter, cssVariableFormatter, reactNativeThemeFormatter } = require("./lib/style-dictionary")

const MODE = 'pc'

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
          filter: filters.isBorder,
          destination: `${MODE}/border-colors.css`,
          format: 'createCSSVariableBorderColor',
        },
        {
          filter: filters.isBoxShadow,
          destination: `${MODE}/box-shadows.css`,
          format: 'createCSSVariableBoxShadow',
        },
        {
          filter: filters.isFont,
          destination: `${MODE}/fonts.css`,
          format: 'createCSSVariableFont',
        },
        {
          filter: filters.isFontSize,
          destination: `${MODE}/font-sizes.css`,
          format: 'createCSSVariableFontSize',
        },
        {
          filter: filters.isFontWeight,
          destination: `${MODE}/font-weights.css`,
          format: 'createCSSVariableFontWeight',
        },
        {
          filter: filters.isLineHeight,
          destination: `${MODE}/line-heights.css`,
          format: 'createCSSVariableLineHeight',
        },
        {
          filter: filters.isFontFamily,
          destination: `${MODE}/font-families.css`,
          format: 'createCSSVariableFontFamily',
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
        {
          filter: filters.isFont,
          destination: 'fonts.json',
          format: 'createTailwindThemeFont',
        },
        {
          filter: filters.isFontSize,
          destination: `font-sizes.json`,
          format: 'createTailwindThemeFontSize',
        },
        {
          filter: filters.isFontWeight,
          destination: `font-weights.json`,
          format: 'createTailwindThemeFontWeight',
        },
        {
          filter: filters.isLineHeight,
          destination: `line-heights.json`,
          format: 'createTailwindThemeLineHeight',
        },
        {
          filter: filters.isFontFamily,
          destination: `font-families.json`,
          format: 'createTailwindThemeFontFamily',
        },
      ],
    },
  },
};
