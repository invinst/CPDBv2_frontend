import axiosMockClient from 'utils/axios-mock-client';

import landingPageGetData from './landing-page/get-data';
import suggestionGetData from './landing-page/suggestions';

const SEARCH_API_URL = /^suggestion\/([^/]*)\//;
const LANDING_PAGE_API_URL = /cms-pages\/landing-page\//;


axiosMockClient.onGet(LANDING_PAGE_API_URL).reply(200, landingPageGetData);
axiosMockClient.onGet(SEARCH_API_URL).reply(function (config) {
  const matchs = SEARCH_API_URL.exec(config.url);
  return [200, suggestionGetData[config.params.contentType || matchs[1]] || suggestionGetData['default']];
});

export function getMockAdapter() {
  if (global.LIVE_TEST !== undefined) {
    return axiosMockClient.adapter();
  }
  return null;
}
