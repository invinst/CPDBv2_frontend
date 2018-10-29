#!/usr/bin/env node

const azure = require('azure-storage');
const Promise = require('bluebird');
const _ = require('lodash');
const moment = require('moment');


let accountName = process.env.AZURE_STORAGE_STAGING_ACCOUNT_NAME;
let accountKey = process.env.AZURE_STORAGE_STAGING_ACCOUNT_KEY;
const container = process.env.AZURE_STATICFILES_CONTAINER;

if (process.env.CIRCLE_BRANCH === 'master') {
  accountName = process.env.AZURE_STORAGE_PROD_ACCOUNT_NAME;
  accountKey = process.env.AZURE_STORAGE_PROD_ACCOUNT_KEY;
}

const BUILDS_KEEP = 1;

const blobService = Promise.promisifyAll(azure.createBlobService(accountName, accountKey));

const getBlobsSegments = (token) => {
  return blobService.listBlobsSegmentedAsync(container, token);
};

const handleBlobsResult = (blobsResult) => {
  const token = blobsResult.continuationToken;
  if (token) {
    return getBlobsSegments(token).then(handleBlobsResult);
  }

  return blobsResult.entries;
};

const getListBlobs = () => {
  return getBlobsSegments(null).then(handleBlobsResult);
};

getListBlobs().then((blobs) => {
  if (!blobs) {
    console.log('No blob found.');
  }

  const bundleBlobs = _.filter(blobs, blob => blob.name.match(/^bundle-.*\.(css|js)/g) != null);

  bundleBlobs.forEach(blob => {
    blob.modifiedDate = moment(blob.lastModified, 'ddd, D MMM YYYY HH:mm:ss GMT').format('YYYY-MM-DD');
  });

  const lastModifiedDates = _.orderBy(
    _.uniq(
      bundleBlobs.map(blob => blob.modifiedDate)
    ),
    obj => obj,
    'desc'
  );

  if (lastModifiedDates.length <= BUILDS_KEEP) {
    return;
  }

  const oldBuiltBlobs = _.filter(
    bundleBlobs,
    blob => blob.modifiedDate < lastModifiedDates[BUILDS_KEEP - 1]
  );

  for (let blob of oldBuiltBlobs) {
    console.log(`Deleting blob: ${blob.name}`);
    blobService.deleteBlobIfExistsAsync(container, blob.name).then((isSuccess) => {
      if (isSuccess) {
        console.log(`..Done deleting: ${blob.name}`);
      } else {
        console.log(`..ERROR on deleting: ${blob.name}`);
      }
    });
  }

});
