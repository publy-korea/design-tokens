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
const outputDirectory = path.resolve('icons/web');

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
    if (!transformedIcons[filename]) {
      transformedIcons[filename] = {};
    }
    transformedIcons[filename][iconType] = svgPath;
  }
});

Object.entries(transformedIcons).forEach(([name, paths]) => {
  if (!('outline' in paths)) {
    throw new Error(`Icon ${name} does not have an outline type`);
  }

  const outputFilePath = path.join(outputDirectory, `${name}Icon.tsx`);
  const header = `/**\n * 직접 수정 금지 - 스크립트로 자동 생성됨\n */`;
  const stringifiedPaths = Object.entries(paths).map(([type, path]) => {
    return `\n\t"${type}": ${path.replace(/\n/g, '')}`;
  });

  const outputFileContent = `${header}
import * as React from 'react';

const paths = {${stringifiedPaths.join(',')}
};

type Props = React.SVGProps<SVGSVGElement> & { type?: keyof typeof paths };

function ${name}Icon({ type = Object.keys(paths)[0] as keyof typeof paths, ...props }: Props) {
  const path = paths[type];
  return (
    <svg
      width="24"
      height="24"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {path}
    </svg>
  );
}

export default ${name}Icon;
`;
  fs.writeFileSync(outputFilePath, outputFileContent);
});

console.log('Icon files have been generated in', outputDirectory);
