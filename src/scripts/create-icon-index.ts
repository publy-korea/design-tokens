/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * icons 디렉토리에 있는 아이콘들을 index.tsx 파일로 export 하는 스크립트
 */

import fs from 'fs';
import path from 'path';

const [_nodePath, _scriptPath, iconsDirectory = './icons'] = process.argv;

const indexFilePath = path.join(iconsDirectory, 'index.tsx');
if (fs.existsSync(indexFilePath)) {
  fs.unlinkSync(indexFilePath);
}

fs.readdir(iconsDirectory, (err, files) => {
  if (err) {
    console.error('Error reading icons directory:', err);
    return;
  }

  const filenames = files.map(file => path.basename(file, '.tsx'));
  const outputFilePath = path.join(iconsDirectory, 'index.tsx');

  const outputFileContent = filenames
    .map(filename => `export { default as ${filename} } from './${filename}';`)
    .join('\n');

  fs.writeFileSync(outputFilePath, outputFileContent);

  console.log('index file of icons were generated in ', outputFilePath);
});
