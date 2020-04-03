#!/usr/bin/env node

const path = require('path');
const azure = require('azure-storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const execAsync = Promise.promisify(require('child_process').exec);

let accountName = process.env.AZURE_STORAGE_STAGING_ACCOUNT_NAME;
let accountKey = process.env.AZURE_STORAGE_STAGING_ACCOUNT_KEY;

if (process.env.CIRCLE_BRANCH === 'master') {
  accountName = process.env.AZURE_STORAGE_PROD_ACCOUNT_NAME;
  accountKey = process.env.AZURE_STORAGE_PROD_ACCOUNT_KEY;
}


const blobService = Promise.promisifyAll(azure.createBlobService(accountName, accountKey));

const distPath = _path => path.join(__dirname, '../dist', _path);

const filesFromFolder = (dir, ext) => {
  return fs.readdirAsync(dir).then(files => {
    const validFiles = [];
    for (let i=0; i < files.length; i++) {
      const filename = files[i];
      if (filename.endsWith(ext)) {
        validFiles.push(filename);
      }
    }
    if (validFiles.length === 0) {
      throw `No file can be found with extension ${ext} in directory ${dir}`;
    }
    return validFiles;
  });
};

const distFileWithExtension = ext => filesFromFolder(distPath('.'), ext);

const uploadFile = (container, path, localPath, contentType, cacheControl, contentEncoding) => {
  console.info(`Uploading file ${path}`);
  return blobService.createBlockBlobFromLocalFileAsync(
    container,
    path,
    localPath,
    {
      contentSettings: {
        contentType,
        cacheControl,
        contentEncoding
      }
    }
  ).then(() => {
    console.info(`.. Done uploading file ${path}`);
  });
};

const uploadStaticFile = (path, localPath, contentType) => {
  return execAsync(`gzip < ${localPath} > ${localPath}.gz`).then(() =>
    uploadFile('static', path, `${localPath}.gz`, contentType, 'max-age=31556926', 'gzip')
  );
};

const uploadStaticFilesWithExtension = (directory, contentType, ext) => {
  const dir = distPath(directory);
  return filesFromFolder(dir, ext).then(files => {
    const uploads = [];
    for (let i=0; i < files.length; i++) {
      const filename = files[i];
      uploads.push(uploadStaticFile(path.join(directory, filename), path.join(dir, filename), contentType));
    }
    return Promise.all(uploads);
  });
};

const uploadFontFiles = (contentType, ext) => uploadStaticFilesWithExtension('fonts', contentType, ext);
const uploadImgFiles = (contentType, ext) => uploadStaticFilesWithExtension('img', contentType, ext);

blobService.createContainerIfNotExistsAsync('templates', { publicAccessLevel: 'blob' }).then(() => {
  return uploadFile('templates', 'index.html', distPath('index.html'), 'text/html', 'no-cache', undefined);
});

blobService.createContainerIfNotExistsAsync('static', { publicAccessLevel: 'blob' }).then(() => {
  return Promise.all([
    distFileWithExtension('.js').then(files => {
      return uploadStaticFile(files[0], distPath(files[0]), 'application/javascript');
    }),
    distFileWithExtension('.css').then(files => {
      return uploadStaticFile(files[0], distPath(files[0]), 'text/css');
    }),
    uploadFontFiles('font/otf', '.otf'),
    uploadFontFiles('font/ttf', '.ttf'),
    uploadFontFiles('font/woff', '.woff'),
    uploadFontFiles('font/woff2', '.woff2'),
    uploadImgFiles('image/svg+xml', '.svg'),
    uploadImgFiles('image/png', '.png'),
  ]);
});
