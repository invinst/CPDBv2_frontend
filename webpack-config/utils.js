'use strict';
const staticFileBase = () => {
  if (process.env.CPDB_APP_ENV === 'staging' || process.env.CPDB_APP_ENV === 'prod') {
    return [
      'https://',
      process.env.AZURE_STORAGE_ACCOUNT_NAME,
      '.blob.core.windows.net/',
      process.env.CONTAINER_PREFIX, '-', process.env.CIRCLE_BRANCH
    ].join('');
  }

  return '';
};

module.exports = {
  staticFileBase: staticFileBase
};
