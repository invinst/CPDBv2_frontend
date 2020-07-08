import api from '../mock-api';
import { toastsData, appConfigData } from './common';

export const mockCommonApi = () => {
  api.onGet('/api/v2/toast/').reply(200, toastsData);
  api.onGet('/api/v2/app-config/').reply(200, appConfigData);
  api.onGet('/api/v2/pinboards/latest-retrieved-pinboard/').reply(200, {});
};
