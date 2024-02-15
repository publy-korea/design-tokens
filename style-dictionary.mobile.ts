import StyleDictionary from 'style-dictionary';
import { Config } from 'style-dictionary/types/Config';
import {
  cssVariableFormatter,
  filters,
  lineHeightTransform,
  reactNativeThemeFormatter,
  reactNativeTransformGroup,
  tailwindThemeFormatter,
} from './src/utils/style-dictionary-helpers';

const MODE = 'mobile';

StyleDictionary.registerTransform(lineHeightTransform);
StyleDictionary.registerTransformGroup(reactNativeTransformGroup)

const config: Config = {
  source: [`transformed/${MODE}.json`],
  format: {
    ...tailwindThemeFormatter,
    ...cssVariableFormatter(MODE),
    ...reactNativeThemeFormatter,
  },
  platforms: {
    css: {
      transforms: [lineHeightTransform.name, 'attribute/cti', 'name/cti/kebab'],
      buildPath: './src/css/',
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
    rn: {
      transformGroup: reactNativeTransformGroup.name,
      buildPath: './src/react-native/',
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

const sd = StyleDictionary.extend(config);
sd.cleanAllPlatforms();
sd.buildAllPlatforms();
