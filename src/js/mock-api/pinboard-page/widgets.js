import axiosMockClient from 'utils/axios-mock-client';
import { PINBOARDS_URL } from 'utils/constants';
import { getOrCreateEmptyPinboard } from 'mock-api/pinboard';
import {
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'mock-api/pinboard-page/fetch-pinned-items';


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

axiosMockClient.onGet (`${PINBOARDS_URL}ceea8ea3/complaint-summary/`).reply(function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([
        200,
        [
          {
            'category': 'Operation/Personnel Violations',
            'count': 10,
          },
          {
            'category': null,
            'count': 8,
          },
          {
            'category': 'Lockup Procedures',
            'count': 4,
          },
          {
            'category': 'Money / Property',
            'count': 4,
          },
          {
            'category': 'Illegal Search',
            'count': 4,
          },
          {
            'category': 'Traffic',
            'count': 4,
          },
          {
            'category': 'Use Of Force',
            'count': 3,
          },
          {
            'category': 'Verbal Abuse',
            'count': 1,
          },
        ],
      ]);
    }, 3000);
  });
});

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/trr-summary/`).reply(function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([
        200,
        [
          {
            'force_type': null,
            'count': 141,
          },
          {
            'force_type': 'Physical Force - Holding',
            'count': 56,
          },
          {
            'force_type': 'Verbal Commands',
            'count': 38,
          },
          {
            'force_type': 'Physical Force - Stunning',
            'count': 35,
          },
          {
            'force_type': 'Member Presence',
            'count': 33,
          },
          {
            'force_type': 'Physical Force - Direct Mechanical',
            'count': 5,
          },
          {
            'force_type': 'Other Force',
            'count': 3,
          },
          {
            'force_type': 'Firearm',
            'count': 1,
          },
          {
            'force_type': 'Taser',
            'count': 1,
          },
        ],
      ]);
    }, 3000);
  });
});

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/officers-summary/`).reply(function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([
        200,
        {
          'race': [
            {
              'race': 'Black',
              'percentage': 0.02,
            },
            {
              'race': 'White',
              'percentage': 0.98,
            },
            {
              'race': 'Hispanic',
              'percentage': 0.0,
            },
            {
              'race': 'Other',
              'percentage': 0.0,
            },
          ],
          'gender': [
            {
              'gender': 'M',
              'percentage': 1.0,
            },
            {
              'gender': 'F',
              'percentage': 0.0,
            },
            {
              'gender': 'Unknown',
              'percentage': 0.0,
            },
          ],
        },
      ]);
    }, 3000);
  });
});

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/complainants-summary/`).reply(function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([
        200,
        {
          'race': [
            {
              'race': 'Black',
              'percentage': 0.63,
            },
            {
              'race': 'White',
              'percentage': 0.12,
            },
            {
              'race': 'Hispanic',
              'percentage': 0.1,
            },
            {
              'race': 'Other',
              'percentage': 0.15,
            },
          ],
          'gender': [
            {
              'gender': 'M',
              'percentage': 0.62,
            },
            {
              'gender': 'F',
              'percentage': 0.32,
            },
            {
              'gender': 'Unknown',
              'percentage': 0.06,
            },
          ],
        },
      ]);
    }, 3000);
  });
});

module.exports = axiosMockClient;
