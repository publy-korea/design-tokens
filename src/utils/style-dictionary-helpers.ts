import { transformLineHeight } from '@tokens-studio/sd-transforms';
import setWith from 'lodash.setwith';
import { parseToRgb } from 'polished';
import { Dictionary, Named, Transform, TransformGroup, TransformedToken } from 'style-dictionary';

export const filters = {
  isColor: (token: TransformedToken) => token.type === 'color',
  isBoxShadow: (token: TransformedToken) => token.type === 'boxShadow',
  isBorder: (token: TransformedToken) => token.type === 'border',
  isFont: (token: TransformedToken) => token.type === 'typography',
  isFontSize: (token: TransformedToken) => token.type === 'fontSizes',
  isFontWeight: (token: TransformedToken) => token.type === 'fontWeights',
  isLineHeight: (token: TransformedToken) => token.type === 'lineHeights',
  isFontFamily: (token: TransformedToken) => token.type === 'fontFamilies',
};

// TODO: @jaesung css variable에 pc 기준의 기본값을 넣어줘서 테일윈드 자동완성에서 값을 볼 수 있게 하기.
// https://developer.mozilla.org/en-US/docs/Web/CSS/var#declaration-value 참고.
export const tailwindThemeFormatter = {
  createTailwindThemeColor: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      setWith(
        theme,
        token.path.join('.'),
        `var(--${token.path.join('-')}, ${token.value})`,
        Object,
      );
    });

    return JSON.stringify(theme, undefined, 2);
  },
  createTailwindThemeBorder: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      const { style, width, color } = token.value;
      setWith(
        theme,
        token.path.join('-'),
        `var(--${token.path.join('-')}, ${style} ${width}px ${color})`,
        Object,
      );
    });

    return JSON.stringify(theme, undefined, 2);
  },
  createTailwindThemeBorderColor: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      setWith(
        theme,
        token.path.join('.'),
        `var(--${token.path.join('-')}-color, ${token.value.color})`,
        Object,
      );
    });

    return JSON.stringify(theme, undefined, 2);
  },
  createTailwindThemeBoxShadow: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      const { x, y, blur, spread, color } = token.value;
      const [hex, alpha] = color.split(', ');
      const { red, green, blue } = parseToRgb(hex);
      setWith(
        theme,
        token.path.join('-'),
        `var(--${token.path.join(
          '-',
        )}, ${x}px ${y}px ${blur}px ${spread}px rgb(${red} ${green} ${blue} / ${alpha}))`,
        Object,
      );
    });
    return JSON.stringify(theme, undefined, 2);
  },
  createTailwindThemeFont: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      const { fontFamily, fontWeight, lineHeight, fontSize } = token.value;
      setWith(
        theme,
        token.path.join('-'),
        `var(--${token.path.join('-')}, ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily})`,
        Object,
      );
    });
    return JSON.stringify(theme, undefined, 2);
  },
  createTailwindThemeFontSize: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      setWith(
        theme,
        token.path.join('-'),
        `var(--${token.path.join('-')}, ${token.value})`,
        Object,
      );
    });
    return JSON.stringify(theme, undefined, 2);
  },
  createTailwindThemeFontWeight: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      setWith(
        theme,
        token.path.join('-'),
        `var(--${token.path.join('-')}, ${token.value})`,
        Object,
      );
    });
    return JSON.stringify(theme, undefined, 2);
  },
  createTailwindThemeLineHeight: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      setWith(
        theme,
        token.path.join('-'),
        `var(--${token.path.join('-')}, ${token.value})`,
        Object,
      );
    });
    return JSON.stringify(theme, undefined, 2);
  },
  createTailwindThemeFontFamily: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      setWith(
        theme,
        token.path.join('-'),
        `var(--${token.path.join('-')}, ${token.value})`,
        Object,
      );
    });
    return JSON.stringify(theme, undefined, 2);
  },
};

export const cssVariableFormatter = (mode: 'pc' | 'mobile') => ({
  createCSSVariableColor: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map(token => `--${token.path.join('-')}: ${token.value};`)
    .join('\n  ')}\n}`,

  createCSSVariableBorder: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map((token: TransformedToken) => {
      const { style, width, color } = token.value;
      return `--${token.path.join('-')}: ${style} ${width}px ${color};`;
    })
    .join('\n  ')}\n}`,
  createCSSVariableBorderColor: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map((token: TransformedToken) => `--${token.path.join('-')}-color: ${token.value.color};`)
    .join('\n  ')}\n}`,
  createCSSVariableBoxShadow: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map((token: TransformedToken) => {
      const { x, y, blur, spread, color } = token.value;
      const [hex, alpha] = color.split(', ');
      const { red, green, blue } = parseToRgb(hex);
      return `--${token.path.join(
        '-',
      )}: ${x}px ${y}px ${blur}px ${spread}px rgb(${red} ${green} ${blue} / ${alpha});`;
    })
    .join('\n  ')}\n}`,
  createCSSVariableFont: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map((token: TransformedToken) => {
      const { fontFamily, fontWeight, lineHeight, fontSize } = token.value;
      return `--${token.path.join('-')}: ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily};`;
    })
    .join('\n  ')}\n}`,
  createCSSVariableFontSize: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map((token: TransformedToken) => `--${token.path.join('-')}: ${token.value};`)
    .join('\n  ')}\n}`,
  createCSSVariableFontWeight: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map((token: TransformedToken) => `--${token.path.join('-')}: ${token.value};`)
    .join('\n  ')}\n}`,
  createCSSVariableLineHeight: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map((token: TransformedToken) => `--${token.path.join('-')}: ${token.value};`)
    .join('\n  ')}\n}`,
  createCSSVariableFontFamily: ({ dictionary }: { dictionary: Dictionary }) => `.theme-${mode} {\n  ${dictionary.allTokens
    .map((token: TransformedToken) => `--${token.path.join('-')}: ${token.value};`)
    .join('\n  ')}\n}`,
});

const REACT_NATIVE_OUTPUT_HEADER = `/**\n * 직접 수정하지 마세요\n * npm run style-dictionary:mobile 에 의해 생성됩니다\n */`;

export const reactNativeThemeFormatter = {
  createReactNativeThemeColor: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme: Record<string, string> = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      const [first, ...rest] = token.path;
      const keys = [first, ...rest.map(key => key.charAt(0).toUpperCase() + key.slice(1))];
      theme[keys.join('')] = token.value;
    });

    return `${REACT_NATIVE_OUTPUT_HEADER}\n\nexport default ${JSON.stringify(theme, undefined, 2)} as const`;
  },
  createReactNativeThemeBorderColor: ({ dictionary }: { dictionary: Dictionary }) => {
    const theme: Record<string, string> = {};
    dictionary.allTokens.forEach((token: TransformedToken) => {
      const [first, ...rest] = token.path;
      const keys = [first, ...rest.map(key => key.charAt(0).toUpperCase() + key.slice(1))];
      theme[keys.join('')] = token.value.color;
    });

    return `${REACT_NATIVE_OUTPUT_HEADER}\n\nexport default ${JSON.stringify(theme, undefined, 2)} as const`;
  },
};

export const lineHeightTransform: Named<Transform> = {
  name: 'publy/size/lineheight',
  type: 'value',
  transitive: true,
  matcher: ({ type }) => ['lineHeights', 'typography'].includes(type),
  transformer: (token) => {
    if (token.type === 'lineHeights') {
      return transformLineHeight(token.value)
    } if (token.type === 'typography') {
      return {
        ...token.value,
        lineHeight: transformLineHeight(token.value.lineHeight)
      };
    }
    return token;
  },
}

export const reactNativeTransformGroup: Named<TransformGroup> = {
  name: 'publy/react-native',
  transforms: [
    lineHeightTransform.name,
    'name/cti/camel',
    'size/object',
    'color/css'
  ]
}
