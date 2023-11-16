const setWith = require('lodash.setwith');
const { parseToRgb } = require('polished');

/**
 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
 */
function isColor(token) {
  return token.type === 'color';
}

/**
 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
 */
function isBoxShadow(token) {
  return token.type === 'boxShadow';
}

/**
 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
 */
function isBorder(token) {
  return token.type === 'border';
}

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  source: ['tokens/pc.json'],
  format: {
    createTailwindThemeColor: ({ dictionary }) => {
      const theme = {};
      dictionary.allTokens.forEach(token => {
        setWith(
          theme,
          token.path.join('.'),
          `var(--${token.path.join('-')})`,
          Object
        );
      });

      return JSON.stringify(theme, undefined, 2);
    },
    createCSSVariableColor: ({ dictionary }) => {
      return `.theme-pc {\n  ${dictionary.allTokens
        .map(token => `--${token.path.join('-')}: ${token.value};`)
        .join('\n  ')}\n}`;
    },
    createTailwindThemeBorder: ({ dictionary }) => {
      const theme = {};
      dictionary.allTokens.forEach(token => {
        setWith(
          theme,
          token.path.join('.'),
          `var(--${token.path.join('-')})`,
          Object
        );
      });

      return JSON.stringify(theme, undefined, 2);
    },
    createCSSVariableBorder: ({ dictionary }) => {
      return `.theme-pc {\n  ${dictionary.allTokens
        .map(
          token =>
            `--${token.path.join('-')}: ${token.value.style} ${
              token.value.width
            }px ${token.value.color};`
        )
        .join('\n  ')}\n}`;
    },
    createTailwindThemeBoxShadow: ({ dictionary }) => {
      const theme = {};
      dictionary.allTokens.forEach(token => {
        const { x, y, blur, spread } = token.value;
        const [color, alpha] = token.value.color.split(', ');
        const { red, green, blue } = parseToRgb(color);
        setWith(
          theme,
          token.path.join('-'),
          `${x}px ${y}px ${blur}px ${spread}px rgb(${red} ${green} ${blue} / ${alpha})`,
          Object
        );
      });
      return JSON.stringify(theme, undefined, 2);
    },
    createReactNativeTheme: ({ dictionary }) => {
      const theme = {};
      dictionary.allTokens.forEach(token => {
        const [first, ...rest] = token.path;
        const keys = [
          first,
          ...rest.map(key => key.charAt(0).toUpperCase() + key.slice(1)),
        ];
        theme[keys.join('')] = token.value;
      });

      const header = `/**\n * 직접 수정하지 마세요\n * ${new Date()}에 생성됨\n */`;

      return `${header}\n\nexport default ${JSON.stringify(
        theme,
        undefined,
        2
      )} as const`;
    },
  },
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/cti/kebab'],
      buildPath: './css/',
      files: [
        {
          filter: isColor,
          destination: 'pc/colors.css',
          format: 'createCSSVariableColor',
        },
        {
          filter: isBorder,
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
          filter: isColor,
          destination: 'colors.json',
          format: 'createTailwindThemeColor',
        },
        {
          filter: isBorder,
          destination: 'borders.json',
          format: 'createTailwindThemeBorder',
        },
      ],
    },
  },
};
