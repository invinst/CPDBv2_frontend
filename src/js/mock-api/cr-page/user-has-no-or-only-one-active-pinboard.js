import axiosMockClient from 'utils/axios-mock-client';
import {
  CR_URL,
  PINBOARDS_URL,
  TOAST_API_URL,
} from 'utils/constants';
import { getToasts } from '../toasts';
import getCRData from './get-data';

axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': false } }
).reply(() => [200, {}]);
axiosMockClient.onGet(TOAST_API_URL).reply(200, getToasts());
axiosMockClient.onGet(PINBOARDS_URL, { params: { detail: true } }).reply(200, []);
axiosMockClient.onGet(`${CR_URL}1000000/`).reply(200, getCRData());

module.exports = axiosMockClient;
