import fs from 'fs';
import path from 'path';

type IconType = {
  [name: string]: {
    svg: string;
    name: string;
    png: Record<string, string>;
  },
}

function toPascalCase(str:string) {
  return str
    .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
    .replace(/^[a-z]/, (firstLetter) => firstLetter.toUpperCase());
}
const iconsJsonPath = '.icona/icons.json';
const outputDirectory = path.resolve('icons/rn');

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, {recursive: true});
}

const iconsJsonContent = fs.readFileSync(iconsJsonPath, 'utf8');
const iconsData: IconType = JSON.parse(iconsJsonContent);

const transformedIcons: {
  [name: string]: {
    solidPath: string;
    outlinePath: string;
  }
} = {}

Object.values(iconsData).forEach(icon => {
  const [iconName, iconType] = icon.name.split('_');
  const pathType = iconType === 'yes' ? 'solidPath' : 'outlinePath';
  const filename = path.basename(toPascalCase(iconName.split("/")[1]), '.tsx');
  const svgContent = icon.svg;
  const svgRegex = /<svg[^>]*>([\s\S]*?)<\/svg>/;
  const svgMatch = svgContent.match(svgRegex) 
  if (svgMatch) {
    const svgPath = svgMatch[1];
    transformedIcons[filename] = { ...transformedIcons[filename], [pathType]: svgPath, }
  }
})

Object.entries(transformedIcons).forEach(([name, paths]) => {
  const outputFilePath = path.join(outputDirectory, `${name}Icon.tsx`);
  const outputFileContent = `import {iconGenerator} from '../utils/icon-utils';

const ${name}Icon = iconGenerator({
  solidPath: \`
    ${paths.solidPath.trim()}
  \`,
  outlinePath: \`
    ${paths.outlinePath.trim()}
  \`,
});

export default ${name}Icon;
`;
  fs.writeFileSync(outputFilePath, outputFileContent);
});

console.log('Icon files have been generated in', outputDirectory);
  

