import mapValues from 'lodash.mapvalues';
import colors from './colors';

export const bg = mapValues(colors, value => ({backgroundColor: value}));

export const border = {
  color: mapValues(colors, value => ({
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
