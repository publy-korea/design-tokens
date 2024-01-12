import mapValues from '../utils/map-values';
import borderOnlyColors from './border-colors';
import colors from './colors';

export const colorValues = colors;

export const bg = mapValues(colors, value => ({ backgroundColor: value }));

const borderColors = {
  ...colors,
  ...borderOnlyColors,
}

export const border = {
  color: mapValues(borderColors, value => ({
    borderColor: value,
    borderTopColor: value,
    borderLeftColor: value,
    borderRightColor: value,
    borderBottomColor: value,
  })),
  topColor: mapValues(borderColors, value => ({
    borderTopColor: value,
  })),
  bottomColor: mapValues(borderColors, value => ({
    borderBottomColor: value,
  })),
  leftColor: mapValues(borderColors, value => ({
    borderLeftColor: value,
  })),
  rightColor: mapValues(borderColors, value => ({
    borderRightColor: value,
  })),
}

export const text = {
  auto: { textAlign: 'auto' as const },
  left: { textAlign: 'left' as const },
  right: { textAlign: 'right' as const },
  center: { textAlign: 'center' as const },
  justify: { textAlign: 'justify' as const },
  color: mapValues(colors, value => ({ color: value })),
  decoration: {
    none: { textDecorationLine: 'none' as const },
    underline: { textDecorationLine: 'underline' as const },
    solid: { textDecorationStyle: 'solid' as const },
    double: { textDecorationStyle: 'double' as const },
    dotted: { textDecorationStyle: 'dotted' as const },
    dashed: { textDecorationStyle: 'dashed' as const },
  }
}
