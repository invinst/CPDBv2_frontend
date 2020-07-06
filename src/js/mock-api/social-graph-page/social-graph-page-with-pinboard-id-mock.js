import axiosMockClient from 'utils/axios-mock-client';
import {
  APP_CONFIG_API_URL,
  PINBOARDS_URL,
  SOCIAL_GRAPH_ALLEGATIONS_API_URL,
  SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  SOCIAL_GRAPH_NETWORK_API_URL,
} from 'utils/constants';
import { getOrCreateEmptyPinboard } from 'mock-api/pinboard';
import { getSocialGraphData } from 'mock-api/pinboard-page/social-graph';
import { pinboardGeographicCrsData, pinboardGeographicTrrsData } from 'mock-api/pinboard-page/geographic-data';
import { getDefaultSocialGraphAllegationsData } from './allegations-data';
import { getAppConfig } from 'mock-api/app-config';


axiosMockClient.onGet(APP_CONFIG_API_URL).reply(200, getAppConfig());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/`).reply(200, getOrCreateEmptyPinboard('5cd06f2b'));

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'pinboard_id': '5cd06f2b' } }
).reply(200, getSocialGraphData());

axiosMockClient.onGet(
  SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  { params: { 'pinboard_id': '5cd06f2b' } }
).reply(200, pinboardGeographicCrsData);
axiosMockClient.onGet(
  SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  { params: { 'pinboard_id': '5cd06f2b' } }
).reply(200, pinboardGeographicTrrsData);

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'threshold': 2, 'complaint_origin': 'CIVILIAN', 'pinboard_id': '5cd06f2b' } }
).reply(200, getSocialGraphData());
axiosMockClient.onGet(
  SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  { params: { detail: true, 'pinboard_id': '5cd06f2b' } }
).reply(200, pinboardGeographicCrsData);
axiosMockClient.onGet(
  SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  { params: { detail: true, 'pinboard_id': '5cd06f2b' } }
).reply(200, pinboardGeographicTrrsData);

axiosMockClient.onGet(
  SOCIAL_GRAPH_ALLEGATIONS_API_URL,
  { params: { 'threshold': 2, 'complaint_origin': 'CIVILIAN', 'pinboard_id': '5cd06f2b' } }
).reply(200, getDefaultSocialGraphAllegationsData());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/complaint-summary/`).reply(
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
);

module.exports = axiosMockClient;
