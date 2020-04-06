import axiosMockClient from 'utils/axios-mock-client';
import {
  OFFICER_URL,
  PINBOARDS_URL,
  TOAST_API_URL,
} from 'utils/constants';
import getSummaryData from './get-summary';
import { getToasts } from '../toasts';

axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': false } }
).reply(() => [200, {}]);
axiosMockClient.onGet(TOAST_API_URL).reply(200, getToasts());
axiosMockClient.onGet(PINBOARDS_URL, { params: { detail: true } }).reply(200, []);
axiosMockClient.onGet(`${OFFICER_URL}1/summary/`).reply(200, getSummaryData());

module.exports = axiosMockClient;
