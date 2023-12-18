import mapValues from '../lib/map-values'
import colors from './colors';
import borderColors from './border-colors';

export const bg = mapValues(colors, value => ({backgroundColor: value}));

export const border = {
  color: mapValues(borderColors, value => ({
    borderColor: value,
    borderTopColor: value,
    borderLeftColor: value,
    borderRightColor: value,
    borderBottomColor: value,
  })),
}

export const text = {
  color: mapValues(colors, value => ({color: value}))
}
