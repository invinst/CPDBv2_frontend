import axiosMockClient from 'utils/axios-mock-client';
import { PINBOARDS_URL } from 'utils/constants';
import { createPinboard, getOrCreateEmptyPinboard, largePinboardsList } from 'mock-api/pinboard';
import {
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'mock-api/pinboard-page/fetch-pinned-items';


axiosMockClient.onGet(`${PINBOARDS_URL}latest-retrieved-pinboard/`, { params: {} }).reply(200, {});

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/`).reply(200, getOrCreateEmptyPinboard('ceea8ea3'));
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/officers/`).reply(200, fetchPinboardOfficers());
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/complaints/`).reply(200, fetchPinboardComplaints());
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/trrs/`).reply(200, fetchPinboardTRRs());

axiosMockClient.onPost(PINBOARDS_URL).reply(201, createPinboard());
axiosMockClient.onGet(PINBOARDS_URL).replyOnce(200, largePinboardsList);

module.exports = axiosMockClient;
