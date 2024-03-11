import fs from 'fs';
import path from 'path';
import {
  IconaDataType,
  TransformedIconsType,
  getSvgInnerHTML,
  removeFillAttribute,
  toPascalCase,
} from './utils';

const iconsJsonPath = '.icona/icons.json';
const outputDirectory = path.resolve('icons/rn');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

const iconsJsonContent = fs.readFileSync(iconsJsonPath, 'utf8');
const iconsData: IconaDataType = JSON.parse(iconsJsonContent);

const transformedIcons: TransformedIconsType = {};

Object.values(iconsData).forEach(icon => {
  const [iconName, iconType] = icon.name.split('_');
  const filename = path.basename(toPascalCase(iconName.split('/')[1]), '.tsx');
  const svgMatch = getSvgInnerHTML(icon.svg);
  if (svgMatch) {
    const svgPath = removeFillAttribute(svgMatch);
    transformedIcons[filename] = {
      ...transformedIcons[filename],
      [iconType]: svgPath,
    };
  }
});

Object.entries(transformedIcons).forEach(([name, paths]) => {
  if (!('outline' in paths)) {
    throw new Error(`Icon ${name} does not have an outline type`);
  }

  const outputFilePath = path.join(outputDirectory, `${name}Icon.tsx`);
  const header = `/**\n * 직접 수정 금지 - 스크립트로 자동 생성됨\n */`;

  const stringifiedPaths = Object.entries(paths).map(([type, path]) => {
    return `\n\t'${type}': '<g>${path.replace(/\n/g, '')}</g>'`;
  });

  try {
    const outputFileContent = `${header}
import Variables from './DEPRECATED_Variables';
import { colorValues } from '../design-tokens/main/react-native';

type TokenColorsType = keyof typeof colorValues;
type VariablesColorsType = keyof typeof Variables.themeColors;
type IconColorType = VariablesColorsType | TokenColorsType;

const paths = {${stringifiedPaths.join(',')}
};

const isTokenColorType = (color: any): color is TokenColorsType => {
  return color in colorValues;
}

const getIconColors = ({ fill, stroke }:{ fill?: IconColorType, stroke?: IconColorType }) => {
  const fillValue = isTokenColorType(fill)
    ? colorValues[fill]
    : Variables.themeColors[fill ?? 'black'];
  const strokeValue = stroke
    ? isTokenColorType(stroke)
      ? colorValues[stroke]
      : Variables.themeColors[stroke]
    : fillValue;
  return { fillValue, strokeValue };
};

const ${name}Icon = (
  params: {
    type?: keyof typeof paths;
    width?: number;
    height?: number;
    fill?: IconColorType;
    stroke?: IconColorType;
    strokeWidth?: number;
  } = {},
) => {
  const {
    type = paths['outline'] ? 'outline' : Object.keys(paths)[0] as keyof typeof paths,
    width = 24,
    height = 24,
    fill = 'colorBlack',
    stroke,
    strokeWidth = 0,
  } = params;
  const { fillValue, strokeValue } = getIconColors({fill, stroke});
  const path = paths[type];

  return \`<svg 
            width="\${width}" 
            height="\${height}" 
            fill="\${fillValue}"  
            stroke="\${strokeValue}" 
            strokeWidth="\${strokeWidth}"
            viewBox="0 0 24 24" 
          >
            \${path}
          </svg>\`;
};

export default ${name}Icon;
`;
    fs.writeFileSync(outputFilePath, outputFileContent);
  } catch (e) {
    console.error('Error writing file', name, paths, e);
  }
});

console.log('Icon files have been generated in', outputDirectory);
