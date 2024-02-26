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

function removeFillAttribute(svgString: string): string {
  const fillRegex = /\sfill="[^"]*"/g;
  return svgString.replace(fillRegex, '');
}

const iconsJsonPath = '.icona/icons.json';
const outputDirectory = path.resolve('icons/web');

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
  const iconNames = icon.name.split('_');
  const iconType = iconNames.pop();
  const iconName = iconNames.join('-');
  const pathType = iconType === 'yes' ? 'solidPath' : 'outlinePath';
  const filename = path.basename(toPascalCase(iconName.split("/")[1]), '.tsx');
  const svgContent = icon.svg;
  const svgRegex = /<svg[^>]*>([\s\S]*?)<\/svg>/;
  const svgMatch = svgContent.match(svgRegex) 
  if (svgMatch) {
    const svgPath = removeFillAttribute(svgMatch[1]);
    transformedIcons[filename] = { ...transformedIcons[filename], [pathType]: svgPath, }
  }
})

Object.entries(transformedIcons).forEach(([name, paths]) => {
  const outputFilePath = path.join(outputDirectory, `${name}Icon.tsx`);

  const outputFileContent = `import * as React from 'react';

type Props = React.SVGProps<SVGSVGElement> & { type?: 'solid' | 'outline' };

function ${name}Icon(props: Props) {
  if (props.type === 'solid') {
    return (
      <svg
        width="24"
        height="24"
        strokeWidth="0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        ${paths.solidPath.trim()}
      </svg>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      ${paths.outlinePath.trim()}
    </svg>
  );
}

export default ${name}Icon;
`
  fs.writeFileSync(outputFilePath, outputFileContent);
});

console.log('Icon files have been generated in', outputDirectory);
  

