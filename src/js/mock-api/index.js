import axiosMockClient from 'utils/axios-mock-client';
import { LANDING_PAGE_API_URL } from 'actions/landing-page';

import landingPageGetData from './landing-page/get-data';


axiosMockClient.onGet(LANDING_PAGE_API_URL).reply(200, landingPageGetData);

/*istanbul ignore next*/
export function getMockAdapter() {
  if (global.LIVE_TEST !== undefined) {
    return axiosMockClient.adapter();
  }
  return null;
}
