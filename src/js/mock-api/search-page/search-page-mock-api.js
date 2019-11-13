import axiosMockClient from 'utils/axios-mock-client';
import {
  PINBOARDS_URL,
} from 'utils/constants';
import {
  emptyPinboard,
} from 'mock-api/pinboard';
import { groupedSuggestions } from 'mock-api/landing-page/suggestions';

const SEARCH_API_URL = /^suggestion\/$/;

axiosMockClient.onGet(SEARCH_API_URL).reply(function (config) {
  return [200, groupedSuggestions[config.params.contentType || config.params.term] || groupedSuggestions['default']];
});

axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': false } }
).reply(() => [200, emptyPinboard('abcd5678')]);

module.exports = axiosMockClient;
