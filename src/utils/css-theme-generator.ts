import { readdir, writeFile } from 'fs/promises';

async function listFilesAndWrite() {
  try {
    const directories = ['mobile', 'pc'];
    let fileContent = '';

    for (const directory of directories) {
      const files = await readdir(`css/${directory}`);
      const imports = files.map(file => `@import './${directory}/${file}';`).join('\n');
      fileContent += `${imports}\n`;
    }

    await writeFile(`css/design-token-themes.css`, fileContent);
    console.log('The file has been saved!');
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

listFilesAndWrite();
