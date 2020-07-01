import axiosMockClient from 'utils/axios-mock-client';
import { PINBOARDS_URL } from 'utils/constants';
import { createPinboard, getOrCreateEmptyPinboard, pinboardsList } from 'mock-api/pinboard';
import {
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'mock-api/pinboard-page/fetch-pinned-items';


axiosMockClient.onGet(`${PINBOARDS_URL}latest-retrieved-pinboard/`, { params: {} }).reply(200, {});

axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': false } }
).reply(() => [200, {}]);

axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': true } }
).reply(() => [200, getOrCreateEmptyPinboard('87e31b82')]);

axiosMockClient.onPut(
  `${PINBOARDS_URL}ceea8ea3/`,
  {
    title: 'Updated Pinboard Title',
    description: 'Pinboard Description',
    'officer_ids': ['1234'],
    'crids': ['1234567'],
    'trr_ids': ['1234'],
  },
).reply(function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([
        200,
        {
          id: 'ceea8ea3',
          title: 'Updated Pinboard Title',
          description: 'Pinboard Description',
          'officer_ids': ['1234'],
          'crids': ['1234567'],
          'trr_ids': ['1234'],
        },
      ]);
    }, 2000);
  });
});

axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    'officer_ids': [],
    'crids': [],
    'trr_ids': [],
  }
).reply(function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([
        200,
        getOrCreateEmptyPinboard('231faa'),
      ]);
    }, 2000);
  });
});

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/`).reply(200, getOrCreateEmptyPinboard('ceea8ea3'));
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/officers/`).reply(200, fetchPinboardOfficers());
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/complaints/`).reply(200, fetchPinboardComplaints());
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/trrs/`).reply(200, fetchPinboardTRRs());

axiosMockClient.onPost(PINBOARDS_URL).reply(201, createPinboard());
axiosMockClient.onGet(PINBOARDS_URL).reply(200, pinboardsList);

module.exports = axiosMockClient;
