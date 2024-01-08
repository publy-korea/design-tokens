import mapValues from '../utils/map-values';
import borderColors from './border-colors';
import colors from './colors';

export const colorValues = colors;

export const bg = mapValues(colors, value => ({ backgroundColor: value }));

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
  auto: { textAlign: 'auto' },
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
  center: { textAlign: 'center' },
  justify: { textAlign: 'justify' },
  color: mapValues(colors, value => ({ color: value })),
  decoration: {
    none: { textDecorationLine: 'none' },
    underline: { textDecorationLine: 'underline' },
    solid: { textDecorationStyle: 'solid' },
    double: { textDecorationStyle: 'double' },
    dotted: { textDecorationStyle: 'dotted' },
    dashed: { textDecorationStyle: 'dashed' },
  }
}
