const setWith = require('lodash.setwith');
const { parseToRgb } = require('polished');

module.exports = {
  filters:{
  	/**
  	 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
  	 */
  	isColor: token => {
  		return token.type === "color";
  	},
  	/**
  	 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
  	 */
  	isBoxShadow: token => {
  		return token.type === "boxShadow";
  	},
  	/**
  	 * @param {import('style-dictionary/types/TransformedToken').TransformedToken} token
  	 */
  	isBorder: token => {
  		return token.type === "border";
  	},
  },
	// TODO: @jaesung css variable에 pc 기준의 기본값을 넣어줘서 테일윈드 자동완성에서 값을 볼 수 있게 하기.
	// https://developer.mozilla.org/en-US/docs/Web/CSS/var#declaration-value 참고.
  tailwindThemeFormatter: {
  	createTailwindThemeColor: ({ dictionary }) => {
  		const theme = {};
  		dictionary.allTokens.forEach(token => {
  			setWith(
  				theme,
  				token.path.join("."),
  				`var(--${token.path.join("-")}, ${token.value})`,
  				Object
  			);
  		});

  		return JSON.stringify(theme, undefined, 2);
  	},
    createTailwindThemeBorder: ({ dictionary }) => {
  		const theme = {};
  		dictionary.allTokens.forEach(token => {
        const { style, width, color } = token.value;	
  			setWith(
  				theme,
  				token.path.join("-"),
  				`var(--${token.path.join("-")}, ${style} ${width}px ${color})`,
  				Object
  			);
  		});

  		return JSON.stringify(theme, undefined, 2);
  	},
    createTailwindThemeBorderColor: ({ dictionary }) => {
  		const theme = {};
  		dictionary.allTokens.forEach(token => {
  			setWith(
  				theme,
  				token.path.join("."),
  				`var(--${token.path.join("-")}-color, ${token.value.color})`,
  				Object
  			);
  		});

  		return JSON.stringify(theme, undefined, 2);
  	},
    createTailwindThemeBoxShadow: ({ dictionary }) => {
  		const theme = {};
  		dictionary.allTokens.forEach(token => {
        const { x, y, blur, spread, color } = token.value;
        const [hex, alpha] = color.split(", ")
        const { red, green, blue } = parseToRgb(hex);
  			setWith(
  				theme,
  				token.path.join("-"),
  				`var(--${token.path.join("-")}, ${x}px ${y}px ${blur}px ${spread}px rgb(${red} ${green} ${blue} / ${alpha}))`,
  				Object
  			);
  		});
  		return JSON.stringify(theme, undefined, 2);
  	},
  },
  cssVariableFormatter: mode => ({
  	createCSSVariableColor:
  		({ dictionary }) => {
  			return `.theme-${mode} {\n  ${dictionary.allTokens
  				.map(token => `--${token.path.join("-")}: ${token.value};`)
  				.join("\n  ")}\n}`;
  		},
  	
  	createCSSVariableBorder:
      ({ dictionary }) => {
    		return `.theme-${mode} {\n  ${dictionary.allTokens
    			.map(
    				token => {
              const { style, width, color } = token.value;
    					return `--${token.path.join("-")}: ${style} ${width}px ${color};`
            }
    			)
    			.join("\n  ")}\n}`;
  	},
    createCSSVariableBorderColor:
      ({ dictionary }) => {
    		return `.theme-${mode} {\n  ${dictionary.allTokens
    			.map(
    				token => {
    					return `--${token.path.join("-")}-color: ${token.value.color};`
            }
    			)
    			.join("\n  ")}\n}`;
  	},
    createCSSVariableBoxShadow:
      ({ dictionary }) => {
    		return `.theme-${mode} {\n  ${dictionary.allTokens
    			.map(
    				token => {
              const { x, y, blur, spread, color } = token.value;
              const [hex, alpha] = color.split(", ")
              const { red, green, blue } = parseToRgb(hex);
    					return `--${token.path.join("-")}: ${x}px ${y}px ${blur}px ${spread}px rgb(${red} ${green} ${blue} / ${alpha});`
            }
    			)
    			.join("\n  ")}\n}`;
  	},
  }),
  reactNativeThemeFormatter: {
    createReactNativeThemeColor: ({dictionary}) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        const [first, ...rest] = token.path;
        const keys = [first, ...rest.map(key => key.charAt(0).toUpperCase() + key.slice(1))];
        theme[keys.join('')] = token.value;
      });

      const header = `/**\n * 직접 수정하지 마세요\n * ${new Date()}에 생성됨\n */`

      return `${header}\n\nexport default ${JSON.stringify(theme, undefined, 2)} as const`;
    },
    createReactNativeThemeBorderColor: ({dictionary}) => {
      const theme = {}
      dictionary.allTokens.forEach(token => {
        const [first, ...rest] = token.path;
        const keys = [first, ...rest.map(key => key.charAt(0).toUpperCase() + key.slice(1))];
        theme[keys.join('')] = token.value.color;
      });

      const header = `/**\n * 직접 수정하지 마세요\n * ${new Date()}에 생성됨\n */`

      return `${header}\n\nexport default ${JSON.stringify(theme, undefined, 2)} as const`;
    },
  }
};
