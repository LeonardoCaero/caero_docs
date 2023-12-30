const fs = require('fs').promises;
const path = require('path');

const createFolder = async (folderPath) => {
  try {
    const appFolderPath = path.join('app', folderPath);

    try {
      await fs.stat(appFolderPath);
      console.log('The folder already exists at the specified location.');
    } catch (err) {
      await fs.mkdir(appFolderPath, { recursive: true });

      const pageFileName = 'page.tsx';
      const layoutFileName = 'layout.tsx';

      const pageTemplatePath = path.join(__dirname, '..', 'templates', 'page.tsx');
      const layoutTemplatePath = path.join(__dirname, '..', 'templates', 'layout.tsx');

      const [pageContent, layoutContent] = await Promise.all([
        fs.readFile(pageTemplatePath, 'utf8'),
        fs.readFile(layoutTemplatePath, 'utf8')
      ]);

      await Promise.all([
        fs.writeFile(path.join(appFolderPath, pageFileName), pageContent),
        fs.writeFile(path.join(appFolderPath, layoutFileName), layoutContent)
      ]);

      console.log('Folder created inside "app", and documents generated successfully.');
    }
  } catch (err) {
    console.error('Error creating the folder:', err);
  }
};

const folderPath = process.argv[2];

if (!folderPath) {
  console.error('You must provide a folder name as an argument.');
} else {
  createFolder(folderPath);
}
