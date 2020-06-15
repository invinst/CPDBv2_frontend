import axiosMockClient from 'utils/axios-mock-client';
import { PINBOARDS_URL } from 'utils/constants';
import { createPinboard, getOrCreateEmptyPinboard, pinboardsList } from 'mock-api/pinboard';
import { fetchPinboardComplaints, fetchPinboardOfficers, fetchPinboardTRRs } from './fetch-pinned-items';


axiosMockClient.onGet(`${PINBOARDS_URL}latest-retrieved-pinboard/`, { params: {} }).reply(200, {});

axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': false } }
).reply(() => [200, {}]);

axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': true } }
).reply(() => [200, getOrCreateEmptyPinboard('87e31b82')]);

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/`).reply(200, getOrCreateEmptyPinboard('ceea8ea3'));
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/officers/`).reply(200, fetchPinboardOfficers());
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/complaints/`).reply(200, fetchPinboardComplaints());
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/trrs/`).reply(200, fetchPinboardTRRs());

axiosMockClient.onPost(PINBOARDS_URL).reply(201, createPinboard());
axiosMockClient.onGet(PINBOARDS_URL).replyOnce(200, pinboardsList);
axiosMockClient.onGet(PINBOARDS_URL).replyOnce(200, [pinboardsList[1]]);
axiosMockClient.onDelete(`${PINBOARDS_URL}77edc128/`).reply(200);
axiosMockClient.onDelete(`${PINBOARDS_URL}ceea8ea3/`).reply(200);

module.exports = axiosMockClient;
