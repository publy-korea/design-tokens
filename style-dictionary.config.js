const setWith = require('lodash.setwith');
const {parseToRgb} = require('polished')

/**
 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
 */
function isColor(token) {
  return token.type === 'color';
}

/**
 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
 */
function isBorder(token) {
  return token.type === 'border';
}

/**
 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
 */
function isBoxShadow(token) {
  return token.type === 'boxShadow';
}

/** @type {import('style-dictionary/types/Config').Config} */
module.exports = {
  // TODO: @jaesung global.json 대신 light.json으로 이름을 바꿔주어야 함(다른 global들도 모두)
  source: ['tokens/global.json'],
  format: {
    handleColorForTailwind: ({ dictionary }) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        setWith(theme, token.path.join('.'), token.value, Object);
      });
      return JSON.stringify(theme, undefined, 2);
    },
    handleBorderColorForTailwind: ({ dictionary }) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        setWith(theme, token.path.join('.'), token.value.color, Object);
      });
      return JSON.stringify(theme, undefined, 2);
    },
    handleBoxShadowForTailwind: ({ dictionary }) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        const {x, y, blur, spread} = token.value;
        const [color, alpha] = token.value.color.split(', ');
        const {red, green, blue} = parseToRgb(color);
        setWith(theme, token.path.join('-'), `${x}px ${y}px ${blur}px ${spread}px rgb(${red} ${green} ${blue} / ${alpha})`, Object);
      });
      return JSON.stringify(theme, undefined, 2);
    },
    handleColorForReactNative: ({dictionary}) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        const [first, ...rest] = token.path;
        const keys = [first, ...rest.map(key => key.charAt(0).toUpperCase() + key.slice(1))];
        theme[keys.join('')] = token.value;
      });

      const header = `/**\n * 직접 수정하지 마세요\n * ${new Date()}에 생성됨\n */`

      return `${header}\n\nexport default ${JSON.stringify(theme, undefined, 2)} as const`;
    },
    handleBorderColorForReactNative: ({dictionary}) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        const [first, ...rest] = token.path;
        const keys = [first, ...rest.map(key => key.charAt(0).toUpperCase() + key.slice(1))];
        theme[keys.join('')] = token.value.color;
      });

      const header = `/**\n * 직접 수정하지 마세요\n * ${new Date()}에 생성됨\n */`

      return `${header}\n\nexport default ${JSON.stringify(theme, undefined, 2)} as const`;
    }
  },
  platforms: {
    tailwind: {
      transforms: ['attribute/cti', 'name/cti/kebab'],
      buildPath: './tailwind/global/',
      files: [
        {
          filter: isColor,
          destination: 'colors.json',
          format: 'handleColorForTailwind'
        },
        {
          filter: isBorder,
          destination: 'border-colors.json',
          format: 'handleBorderColorForTailwind'
        },
        {
          filter: isBoxShadow,
          destination: 'box-shadows.json',
          format: 'handleBoxShadowForTailwind'
        }
      ]
    },
    rn: {
      transformGroup: 'react-native',
      buildPath: './react-native/global/',
      files: [
        {
          filter: isColor,
          destination: 'colors.ts',
          format: 'handleColorForReactNative'
        },
        {
          filter: isBorder,
          destination: 'border-colors.ts',
          format: 'handleBorderColorForReactNative'
        },
      ]
    }
  }
}