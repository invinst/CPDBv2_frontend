import { get } from 'lodash';

import axiosMockClient from 'utils/axios-mock-client';
import {
  ACTIVITY_GRID_API_URL,
  CITY_SUMMARY_API_URL,
  CR_URL,
  SLUG_PAGE_API_URL,
  MAIL_CHIMP_URL,
  OFFICER_URL,
  OFFICERS_BY_ALLEGATION_API_URL,
  RECENT_COMPLAINT_SUMMARIES_URL,
  RECENT_DOCUMENT_URL,
  RESET_PASSWORD_URL,
  SEARCH_TERMS_CATEGORIES_API_URL,
  SIGNIN_URL,
  UNIT_PROFILE_URL,
  TRR_URL,
  POPUP_API_URL,
  DOCUMENTS_URL,
  DOCUMENT_SUGGESTION_TAGS_API_URL,
  CRAWLERS_API_URL,
  SOCIAL_GRAPH_NETWORK_API_URL,
  PINBOARDS_URL,
  ALL_PINBOARD_URL,
  SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  SOCIAL_GRAPH_OFFICERS_API_URL,
  SOCIAL_GRAPH_ALLEGATIONS_API_URL,
  MODAL_VIDEO_INFO,
  RECENT_SEARCH_ITEMS_API_URL,
  TOAST_API_URL,
  APP_CONFIG_API_URL,
} from 'utils/constants';
import { communityGeoJSONPath } from 'utils/static-assets';
import getCRData from './cr-page/get-data';
import getCRDataNoAttachment from './cr-page/get-data-no-attachment';
import getCRRelatedComplaintsData from './cr-page/get-related-complaint';
import getActivityGridData from './landing-page/activity-grid';
import getTopByAllegationData from './landing-page/top-by-allegation';
import { getOfficersData } from './embed/officers';
import { landingPageCMSFields, officerPageCMSFields } from './cms-field';
import getComplaintSummaries from './landing-page/complaint-summaries';
import { getCitySummary, getCommunities } from './landing-page/heat-map';
import getRecentDocument from './landing-page/recent-document';
import { groupedSuggestions, singleGroupSuggestions } from './landing-page/suggestions';
import getCoaccusalsData from './officer-page/get-coaccusals';
import getNewTimelineItemsData from './officer-page/get-new-timeline-item';
import getSummaryData, { noPercentileOfficerSummary } from './officer-page/get-summary';
import getTRRData from './trr-page/get-data';
import getSearchTermsData, { recentSearchItems } from './search-terms-page';
import getUnitSummaryData from './unit-profile-page/get-summary';
import { getCRPopup } from './popup';
import { getToasts } from './toasts';
import { getAppConfig } from './app-config';
import fetchDocumentsByCRID from './document-deduplicator-page/fetch-documents-by-crid';
import searchDocuments from './documents-overview-page/search-documents';
import fetchDocuments from './documents-overview-page/fetch-documents';
import fetchDocumentByID from './document-page/fetch-document-by-id';
import updateDocumentByID from './document-page/update-document-by-id';
import fetchDocumentsAuthenticated from './documents-overview-page/fetch-documents-authenticated';
import { getCrawlersData, getNextCrawlersData } from './crawlers-page/crawlers-page';
import {
  getDefaultSocialGraphData,
  getDefaultOfficerSocialGraphData,
  getOfficerComplaintSocialGraphData,
  getThresholdThreeSocialGraphData,
} from './social-graph-page/social-graph-page';
import { getDefaultSocialGraphOfficersData } from './social-graph-page/officers-data';
import { getDefaultSocialGraphAllegationsData } from './social-graph-page/allegations-data';
import {
  createPinboard,
  emptyPinboard,
  pinboardsList,
  getOrCreateEmptyPinboard,
  updatePinboard,
  updatePinboardTitleParams,
  updatedPinboardTitle,
  updatePinboardDescriptionParams,
  updatedPinboardDescription,
} from './pinboard';
import {
  ffff6666Complaints,
  ffff6666Officers,
  ffff6666TRRs,
  eeee7777Complaints,
  eeee7777Officers,
  eeee8888Complaints,
  eeee8888Officers,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  dcab5678Officers,
  abcd8765Officers,
  abcd8765OUpdatedfficers,
  ceea8ea3UpdatedOfficer,
} from './pinboard-page/fetch-pinned-items';
import { getSocialGraphData } from './pinboard-page/social-graph';
import { getSocialGraphBigData } from './pinboard-page/big-social-graph';
import { pinboardGeographicCrsData, pinboardGeographicTrrsData } from './pinboard-page/geographic-data';
import { socialGraphGeographicCrsData, socialGraphGeographicTrrsData } from './social-graph-page/geographic-data';
import getRelevantCoaccusals, {
  getFirstRelevantCoaccusals,
  filterPinnedOfficers,
} from 'mock-api/pinboard-page/relevant-coaccusals';
import getRelevantDocuments, {
  getFirstRelevantDocuments,
} from 'mock-api/pinboard-page/relevant-documents';
import getRelevantComplaints, {
  getFirstRelevantComplaints,
  filterPinnedComplaints,
} from 'mock-api/pinboard-page/relevant-complaints';
import {
  emptyPagination,
  firstPage,
  secondPage,
  searchPinboardTitle,
} from 'mock-api/pinboard-admin-page/all-pinbooards';
import { modalVideoInfo } from './headers/slim-header';
import PinboardFactory from 'utils/test/factories/pinboard';
import mockUpdatePinboardError from 'mock-api/pinboard-page/mock-update-pinboard-error';
import pinboardsMenu from 'mock-api/officer-page/pinboards-menu';


const SEARCH_API_URL = /^suggestion\/$/;
const SEARCH_SINGLE_API_URL = /^suggestion\/single\/$/;
/* istanbul ignore next */
let latestRetrievePinboard = null;

axiosMockClient.onGet(ACTIVITY_GRID_API_URL).reply(() => [200, getActivityGridData()]);
axiosMockClient.onGet(OFFICERS_BY_ALLEGATION_API_URL).reply(() => [200, getTopByAllegationData()]);
axiosMockClient.onGet(OFFICER_URL, { params: { ids: '1,2,3' } }).reply(() => [200, getOfficersData('1,2,3')]);
axiosMockClient.onGet(RECENT_DOCUMENT_URL).reply(() => [200, getRecentDocument()]);
axiosMockClient.onGet(RECENT_COMPLAINT_SUMMARIES_URL).reply(() => [200, getComplaintSummaries()]);

axiosMockClient.onPost(SIGNIN_URL, { username: 'username', password: 'password' })
  .reply(200, { 'apiAccessToken': '055a5575c1832e9123cd546fe0cfdc8607f8680c' });
axiosMockClient.onPost(SIGNIN_URL, { username: 'badname', password: 'badpassword' })
  .reply(400, { 'message': 'Bad username/password' });

axiosMockClient.onPost(RESET_PASSWORD_URL, { email: 'valid@email.com' })
  .reply(200, { 'message': 'Please check your email for a password reset link.' });
axiosMockClient.onPost(RESET_PASSWORD_URL, { email: 'invalid@email.com' })
  .reply(400, { 'message': 'Sorry, there\'s no account registered with this email address.' });

axiosMockClient.onPost(`${CR_URL}1000000/request-document/`, { email: 'valid@email.com' })
  .reply(200, { 'message': 'Thanks for subscribing.', crid: 1000000 });
axiosMockClient.onPost(`${CR_URL}1000000/request-document/`, { email: 'invalid@email.com' })
  .reply(400, { 'message': 'Sorry, we can not subscribe your email' });

axiosMockClient.onPost(`${TRR_URL}1/request-document/`, { email: 'valid@email.com' })
  .reply(200, { 'message': 'Thanks for subscribing.', 'trr_id': 1 });
axiosMockClient.onPost(`${TRR_URL}1/request-document/`, { email: 'invalid@email.com' })
  .reply(400, { 'message': 'Sorry, we can not subscribe your email' });


// remove "/" from beginning of any v1 path for axios mock adapter to work.
let mailChimpUrl = MAIL_CHIMP_URL.slice(1);
axiosMockClient.onPost(mailChimpUrl, { email: 'valid@email.com' }).reply(200, { 'success': true });
axiosMockClient.onPost(mailChimpUrl, { email: 'invalid@email.com' })
  .reply(400, {
    'detail': 'invalid@email.com looks fake or invalid, please enter a real email address.', 'success': false,
  });

axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'jerome', contentType: 'OFFICER' } }).reply(() => {
  return [200, singleGroupSuggestions.officer];
});

axiosMockClient.onGet(
  SEARCH_SINGLE_API_URL,
  { params: { term: 'jerome', contentType: 'OFFICER', offset: '10' } },
).reply(() => {
  return [200, singleGroupSuggestions.officerOffset10];
});

axiosMockClient.onGet(
  SEARCH_SINGLE_API_URL,
  { params: { term: 'jerome', contentType: 'OFFICER', offset: '20' } },
).reply(() => {
  return [200, singleGroupSuggestions.officerOffset20];
});

axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'jerome', contentType: 'CR' } }).reply(() => {
  return [200, singleGroupSuggestions.cr];
});

axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'jerome', contentType: 'TRR' } }).reply(() => {
  return [200, singleGroupSuggestions.trr];
});

axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'jerome', contentType: 'COMMUNITY' } }).reply(() => {
  return [200, singleGroupSuggestions.community1];
});

axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'community', contentType: 'COMMUNITY' } }).reply(() => {
  return [200, singleGroupSuggestions.community2];
});

axiosMockClient.onGet(SEARCH_API_URL).reply(function (config) {
  return [200, groupedSuggestions[config.params.contentType || config.params.term] || groupedSuggestions['default']];
});

axiosMockClient.onGet(`${OFFICER_URL}1/summary/`).reply(200, getSummaryData());
axiosMockClient.onGet(`${OFFICER_URL}2/summary/`).reply(200, noPercentileOfficerSummary);

axiosMockClient.onGet(`${TRR_URL}1/`).reply(200, getTRRData());

axiosMockClient.onGet(`${CR_URL}1000000/`).reply(200, getCRData());
axiosMockClient.onGet(`${CR_URL}2/`).reply(200, getCRDataNoAttachment());
axiosMockClient.onGet(
  `${CR_URL}1000000/related-complaints/?match=categories&distance=0.5mi`
).reply(200, getCRRelatedComplaintsData({ match: 'categories', distance: '0.5mi' }));

axiosMockClient.onGet(
  `${CR_URL}1000000/related-complaints/?distance=0.5mi&match=categories&offset=20`
).reply(200, getCRRelatedComplaintsData({ match: 'categories', distance: '0.5mi', nextOffset: 40 }));

axiosMockClient.onGet(`${OFFICER_URL}1/new-timeline-items/`).reply(200, getNewTimelineItemsData(1));
axiosMockClient.onGet(`${OFFICER_URL}2/new-timeline-items/`).reply(200, getNewTimelineItemsData(2));
axiosMockClient.onGet(`${OFFICER_URL}1/coaccusals/`).reply(200, getCoaccusalsData());

axiosMockClient.onGet(`${UNIT_PROFILE_URL}001/summary/`).reply(200, getUnitSummaryData());

axiosMockClient.onGet(SEARCH_TERMS_CATEGORIES_API_URL).reply(200, getSearchTermsData());

axiosMockClient.onGet(CITY_SUMMARY_API_URL).reply(200, getCitySummary());
axiosMockClient.onGet(communityGeoJSONPath).reply(200, getCommunities());

axiosMockClient.onGet(`${SLUG_PAGE_API_URL}landing-page/`).reply(200, landingPageCMSFields);
axiosMockClient.onGet(`${SLUG_PAGE_API_URL}officer-page/`).reply(200, officerPageCMSFields);

axiosMockClient.onGet(`https://vimeo.com/api/v2/video/${MODAL_VIDEO_INFO.VIDEO_ID}.json`).reply(200, modalVideoInfo);

axiosMockClient.onGet(`${POPUP_API_URL}?page=complaint`).reply(200, getCRPopup());

axiosMockClient.onGet(`${DOCUMENTS_URL}`, { params: { crid: '1000000', limit: undefined, offset: undefined } })
  .reply(200, fetchDocumentsByCRID());

axiosMockClient.onGet(`${DOCUMENTS_URL}`, { params: { match: '123457' } }).reply(200, searchDocuments());

axiosMockClient.onGet(
  `${ALL_PINBOARD_URL}`, { params: { match: 'Title' } }
).reply(200, searchPinboardTitle);

axiosMockClient.onGet(
  `${DOCUMENTS_URL}`,
  { headers: { 'Authorization': 'Token 055a5575c1832e9123cd546fe0cfdc8607f8680c' } }
).reply(200, fetchDocumentsAuthenticated());

axiosMockClient.onGet(`${DOCUMENTS_URL}`).reply(200, fetchDocuments());

axiosMockClient.onGet(`${DOCUMENTS_URL}1/`).reply(function (config) {
  const authenticated = config.headers['Authorization'] === 'Token 055a5575c1832e9123cd546fe0cfdc8607f8680c';
  return [200, fetchDocumentByID(authenticated)];
});

axiosMockClient.onPatch(`${DOCUMENTS_URL}1/`, { 'show': false }).reply(200, { show: false });

axiosMockClient.onPatch(
  `${DOCUMENTS_URL}1/`,
  updateDocumentByID.success.updateTagParams(['tactical'])
).reply(200, updateDocumentByID.success.updatedDocumentTagData(['tactical']));

axiosMockClient.onPatch(
  `${DOCUMENTS_URL}1/`,
  updateDocumentByID.success.updateTagParams(['tactical', 'chicago'])
).reply(200, updateDocumentByID.success.updatedDocumentTagData(['tactical', 'chicago']));

axiosMockClient.onPatch(
  `${DOCUMENTS_URL}1/`,
  updateDocumentByID.success.updateTagParams(['tactical', 'chicago', 'copa'])
).reply(200, updateDocumentByID.success.updatedDocumentTagData(['tactical', 'chicago', 'copa']));

axiosMockClient.onPatch(
  `${DOCUMENTS_URL}1/`,
  updateDocumentByID.success.updateTagParams(['hospital', 'tactical', 'twitter'])
).reply(200, updateDocumentByID.success.updatedDocumentTagData(['hospital', 'tactical', 'twitter']));

axiosMockClient.onPatch(
  `${DOCUMENTS_URL}1/`,
  updateDocumentByID.failure.updateParamsFailure
).reply(400, updateDocumentByID.failure.updatedDocumentDataFailure);

axiosMockClient.onGet(CRAWLERS_API_URL).reply(function (config) {
  return [200, (config.params && config.params.offset === '20') ? getNextCrawlersData() : getCrawlersData()];
});

axiosMockClient.onGet(DOCUMENT_SUGGESTION_TAGS_API_URL).reply(function (config) {
  return [200, ['twitter', 'Turbyville', 'tactical', 'complaint', 'investigation']];
});

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'threshold': 2, 'complaint_origin': 'CIVILIAN', 'unit_id': '123' } }
).reply(200, getDefaultSocialGraphData());

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'threshold': 2, 'complaint_origin': 'OFFICER', 'unit_id': '123' } }
).reply(200, getDefaultOfficerSocialGraphData());

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'threshold': 2, 'complaint_origin': 'ALL', 'unit_id': '123' } }
).reply(200, getOfficerComplaintSocialGraphData());

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'threshold': 3, 'complaint_origin': 'ALL', 'unit_id': '123' } }
).reply(200, getThresholdThreeSocialGraphData());

function updateLatestRetrievePinboardOnApiCall(status, response) {
  return () => {
    latestRetrievePinboard = response['id'];
    return [status, response];
  };
}

axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    'officer_ids': [],
    'crids': [],
    'trr_ids': [],
  }
).reply(updateLatestRetrievePinboardOnApiCall(201, emptyPinboard('87e31b82')));

axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    'source_pinboard_id': 'ceea8ea3',
  }
).reply(updateLatestRetrievePinboardOnApiCall(201, PinboardFactory.build({ id: '5cd06f2b', title: 'Pinboard Title' })));

axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: '',
    'officer_ids': [1, 2],
    'crids': ['5678123'],
    'trr_ids': [3, 2],
  }
).reply(updateLatestRetrievePinboardOnApiCall(201, createPinboard('ffff6666', [1, 2], ['5678123'], [3, 2])));

axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: '',
    'officer_ids': [1, 2],
    'crids': ['987654', '5678123'],
    'trr_ids': [9, 7],
  }
).reply(
  updateLatestRetrievePinboardOnApiCall(
    201, createPinboard('eeee7777', [1, 2], ['5678123'], [], { 'crids': ['987654'], 'trr_ids': [9, 7] })
  )
);

axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: 'Preset title via url',
    'officer_ids': [1, 2],
    'crids': ['5678123'],
    'trr_ids': [],
  }
).reply(
  updateLatestRetrievePinboardOnApiCall(
    201, createPinboard('eeee8888', [1, 2], ['5678123'], [], undefined, 'Preset title via url')
  )
);

axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: 'Empty pinboard with preset title via url',
    'officer_ids': [],
    'crids': [],
    'trr_ids': [],
  }
).reply(
  updateLatestRetrievePinboardOnApiCall(
    201, createPinboard('eeee9999', [], [], [], undefined, 'Empty pinboard with preset title via url')
  )
);

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('5cd06f2b'))
);

axiosMockClient.onGet(`${PINBOARDS_URL}87e31b82/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('87e31b82'))
);

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('ceea8ea3'))
);

axiosMockClient.onGet(`${PINBOARDS_URL}ffff6666/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('ffff6666'))
);

axiosMockClient.onPut(`${PINBOARDS_URL}5cd06f2b/`).reply(function (config) {
  const pinboard = JSON.parse(config.data);
  pinboard.id = '5cd06f2b';
  pinboard['officer_ids'] = (pinboard['officer_ids'] || []).map(id => parseInt(id));
  pinboard['trr_ids'] = (pinboard['trr_ids'] || []).map(id => parseInt(id));
  const newPinboard = updatePinboard(pinboard);
  return [200, newPinboard];
});

axiosMockClient.onPut(
  `${PINBOARDS_URL}ceea8ea3/`,
  {
    'title': 'Pinboard Title',
    'officer_ids': [],
    'crids': ['1234567'],
    'trr_ids': ['1234'],
    'description': 'Pinboard Description',
  }
).reply(function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([200, ceea8ea3UpdatedOfficer]);
    }, 2000);
  });
});

axiosMockClient.onPut(
  `${PINBOARDS_URL}ceea8ea3/`,
  {
    'title': 'Pinboard Title',
    'officer_ids': ['1234'],
    'crids': [],
    'trr_ids': ['1234'],
    'description': 'Pinboard Description',
  }
).reply(function () { return [500, []]; });

axiosMockClient.onPut(`${PINBOARDS_URL}5cd06f2b/`, updatePinboardTitleParams()).reply(200, updatedPinboardTitle());

axiosMockClient.onPut(
  `${PINBOARDS_URL}5cd06f2b/`, updatePinboardDescriptionParams()
).reply(200, updatedPinboardDescription());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/complaints/`).reply(200, fetchPinboardComplaints());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/officers/`).reply(200, fetchPinboardOfficers());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/trrs/`).reply(200, fetchPinboardTRRs());

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/officers/`).reply(200, fetchPinboardOfficers());
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/complaints/`).reply(200, fetchPinboardComplaints());
axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/trrs/`).reply(200, fetchPinboardTRRs());

axiosMockClient.onGet(`${PINBOARDS_URL}ffff6666/officers/`).reply(200, ffff6666Officers);
axiosMockClient.onGet(`${PINBOARDS_URL}ffff6666/complaints/`).reply(200, ffff6666Complaints);
axiosMockClient.onGet(`${PINBOARDS_URL}ffff6666/trrs/`).reply(200, ffff6666TRRs);
axiosMockClient.onGet(`${PINBOARDS_URL}ffff6666/`).reply(200, ffff6666TRRs);

axiosMockClient.onGet(`${PINBOARDS_URL}eeee7777/officers/`).reply(200, eeee7777Officers);
axiosMockClient.onGet(`${PINBOARDS_URL}eeee7777/complaints/`).reply(200, eeee7777Complaints);
axiosMockClient.onGet(`${PINBOARDS_URL}eeee7777/trrs/`).reply(200, []);

axiosMockClient.onGet(`${PINBOARDS_URL}eeee8888/officers/`).reply(200, eeee8888Officers);
axiosMockClient.onGet(`${PINBOARDS_URL}eeee8888/complaints/`).reply(200, eeee8888Complaints);
axiosMockClient.onGet(`${PINBOARDS_URL}eeee8888/trrs/`).reply(200, []);

axiosMockClient.onGet(`${PINBOARDS_URL}eeee9999/officers/`).reply(200, []);
axiosMockClient.onGet(`${PINBOARDS_URL}eeee9999/complaints/`).reply(200, []);
axiosMockClient.onGet(`${PINBOARDS_URL}eeee9999/trrs/`).reply(200, []);

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'pinboard_id': '5cd06f2b' } }
).reply(200, getSocialGraphData());
axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'pinboard_id': '18a5b091' } }
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
  SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
  { params: { 'unit_id': '123' } }
).reply(200, socialGraphGeographicCrsData);

axiosMockClient.onGet(
  SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
  { params: { 'unit_id': '123' } }
).reply(200, socialGraphGeographicTrrsData);

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-coaccusals/?`).reply(function () {
  const currentPinboard = getOrCreateEmptyPinboard('5cd06f2b');
  const relevantCoaccusals = getFirstRelevantCoaccusals('5cd06f2b', 50);
  return [200, filterPinnedOfficers(relevantCoaccusals, currentPinboard)];
});
axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-coaccusals/?limit=20&offset=20`).reply(
  200, getRelevantCoaccusals('5cd06f2b', 20, 20, 50)
);
axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-coaccusals/?limit=20&offset=40`).reply(
  200, getRelevantCoaccusals('5cd06f2b', 20, 40, 50)
);

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-documents/?`).reply(
  200, getFirstRelevantDocuments('5cd06f2b', 50)
);
axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-documents/?limit=20&offset=20`).reply(
  200, getRelevantDocuments('5cd06f2b', 20, 20, 50)
);
axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-documents/?limit=20&offset=40`).reply(
  200, getRelevantDocuments('5cd06f2b', 20, 40, 50)
);

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-complaints/?`).reply(function () {
  const currentPinboard = getOrCreateEmptyPinboard('5cd06f2b');
  const relevantComplaints = getFirstRelevantComplaints('5cd06f2b', 50);
  return [200, filterPinnedComplaints(relevantComplaints, currentPinboard)];
});
axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-complaints/?limit=20&offset=20`).reply(
  200, getRelevantComplaints('5cd06f2b', 20, 20, 50)
);
axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/relevant-complaints/?limit=20&offset=40`).reply(
  200, getRelevantComplaints('5cd06f2b', 20, 40, 50)
);

axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: '',
    'officer_ids': [1],
    'crids': [],
    'trr_ids': [],
  }
).reply(updateLatestRetrievePinboardOnApiCall(201, createPinboard('e25aa777')));
axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: '',
    'officer_ids': [2],
    'crids': [],
    'trr_ids': [],
  }
).replyOnce(500, {});
axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: '',
    'officer_ids': [2],
    'crids': [],
    'trr_ids': [],
  }
).replyOnce(500, {});
axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: '',
    'officer_ids': [2],
    'crids': [],
    'trr_ids': [],
  }
).reply(updateLatestRetrievePinboardOnApiCall(201, createPinboard('e25aa888', [2])));
axiosMockClient.onPost(
  PINBOARDS_URL,
  {
    title: '',
    'officer_ids': [3],
    'crids': [],
    'trr_ids': [],
  }
).reply(
  function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(updateLatestRetrievePinboardOnApiCall(201, createPinboard('e25aa999', [3]))());
      }, 1000);
    });
  }
);
axiosMockClient.onGet(`${PINBOARDS_URL}e25aa777/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('e25aa777'))
);
axiosMockClient.onGet(`${PINBOARDS_URL}e25aa888/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('e25aa888'))
);
axiosMockClient.onGet(`${PINBOARDS_URL}e25aa999/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('e25aa999'))
);
axiosMockClient.onGet(`${PINBOARDS_URL}e25aa777/officers/`).replyOnce(200, fetchPinboardOfficers());
axiosMockClient.onGet(`${PINBOARDS_URL}e25aa888/officers/`).replyOnce(200, fetchPinboardOfficers());
axiosMockClient.onGet(`${PINBOARDS_URL}e25aa999/officers/`).replyOnce(200, fetchPinboardOfficers());

axiosMockClient.onGet(`${PINBOARDS_URL}abcd1234/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('abcd1234'))
);
axiosMockClient.onGet(`${PINBOARDS_URL}abcd5678/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('abcd5678'))
);
axiosMockClient.onGet(`${PINBOARDS_URL}abcd8765/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('abcd8765'))
);
axiosMockClient.onGet(`${PINBOARDS_URL}dcab5678/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('dcab5678'))
);
axiosMockClient.onGet(`${PINBOARDS_URL}18a5b091/`).reply(
  updateLatestRetrievePinboardOnApiCall(200, getOrCreateEmptyPinboard('18a5b091'))
);
axiosMockClient.onGet(`${PINBOARDS_URL}abcd5678/officers/`).replyOnce(200, fetchPinboardOfficers());
axiosMockClient.onGet(`${PINBOARDS_URL}abcd5678/officers/`).replyOnce(200, {});
axiosMockClient.onGet(`${PINBOARDS_URL}abcd8765/officers/`).replyOnce(200, abcd8765Officers);
axiosMockClient.onGet(`${PINBOARDS_URL}abcd8765/officers/`).replyOnce(200, abcd8765OUpdatedfficers);
axiosMockClient.onGet(`${PINBOARDS_URL}dcab5678/officers/`).replyOnce(200, fetchPinboardOfficers());
axiosMockClient.onGet(`${PINBOARDS_URL}dcab5678/officers/`).replyOnce(200, dcab5678Officers);

axiosMockClient.onPut(
  `${PINBOARDS_URL}abcd5678/`,
  {
    'title': 'Pinboard Title',
    'officer_ids': [],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for abcd5678',
  }
).reply(function () {
  return [200, {
    'id': 'abcd5678',
    'title': 'Pinboard Title',
    'officer_ids': [],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for abcd5678',
    'example_pinboards': [{
      'description': 'Officers with at least 10 complaints against them generate 64% of all complaints.',
      'id': 'b20c2c36',
      'title': 'Watts Crew',
    }, {
      'description': 'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang.',
      'id': '22e66085',
      'title': 'Skullcap Crew',
    }],
  }];
});

axiosMockClient.onPut(
  `${PINBOARDS_URL}abcd8765/`,
  {
    'title': 'Pinboard Title',
    'officer_ids': ['1', '2'],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for abcd8765',
  }
).replyOnce(function () { return [500, {}]; });

axiosMockClient.onPut(
  `${PINBOARDS_URL}abcd8765/`,
  {
    'title': 'Pinboard Title',
    'officer_ids': ['1', '2'],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for abcd8765',
  }
).replyOnce(function () {
  return [200, {
    'id': 'abcd8765',
    'title': 'Pinboard Title',
    'officer_ids': ['1', '2'],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for abcd8765',
  }];
});


axiosMockClient.onPut(
  `${PINBOARDS_URL}dcab5678/`,
  {
    'title': 'Pinboard Title',
    'officer_ids': ['1', '3'],
    'crids': [],
    'trr_ids': [],
    'description': 'Description for dcab5678',
  }
).reply(function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve([200, {
        'id': 'dcab5678',
        'title': 'Pinboard Title',
        'officer_ids': ['1', '3'],
        'crids': [],
        'trr_ids': [],
        'description': 'Description for dcab5678',
      }]);
    }, 2000);
  });
});

axiosMockClient.onGet(`${PINBOARDS_URL}latest-retrieved-pinboard/`, { params: {} }).reply(200, {});
axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': false } }
).reply(() => [200, {}]);
axiosMockClient.onGet(
  `${PINBOARDS_URL}latest-retrieved-pinboard/`,
  { params: { 'create': true } }
).reply(() => [200, getOrCreateEmptyPinboard(latestRetrievePinboard || 'abcd1234')]);

axiosMockClient.onGet(
  SOCIAL_GRAPH_OFFICERS_API_URL,
  { params: { 'threshold': 2, 'complaint_origin': 'CIVILIAN', 'unit_id': '123' } }
).reply(200, getDefaultSocialGraphOfficersData());

axiosMockClient.onGet(
  SOCIAL_GRAPH_ALLEGATIONS_API_URL,
  { params: { 'threshold': 2, 'complaint_origin': 'CIVILIAN', 'unit_id': '123' } }
).reply(200, getDefaultSocialGraphAllegationsData());

axiosMockClient.onGet(`${PINBOARDS_URL}3664a7ea/`).reply(200, getOrCreateEmptyPinboard('3664a7ea'));

axiosMockClient.onGet(`${PINBOARDS_URL}77edc128/`).reply(200, getOrCreateEmptyPinboard('77edc128'));

axiosMockClient.onGet(`${PINBOARDS_URL}3664a7ea/complaints/`).reply(200, fetchPinboardComplaints());

axiosMockClient.onGet(`${PINBOARDS_URL}3664a7ea/officers/`).reply(200, fetchPinboardOfficers());

axiosMockClient.onGet(`${PINBOARDS_URL}3664a7ea/trrs/`).reply(200, fetchPinboardTRRs());

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'pinboard_id': '3664a7ea' } }
).reply(200, getSocialGraphBigData());

axiosMockClient.onGet(`${PINBOARDS_URL}3664a7ea/relevant-coaccusals/?`).reply(
  200, getFirstRelevantCoaccusals('3664a7ea', 50)
);

axiosMockClient.onGet(`${PINBOARDS_URL}3664a7ea/relevant-documents/?`).reply(
  200, getFirstRelevantDocuments('3664a7ea', 50)
);

axiosMockClient.onGet(`${PINBOARDS_URL}ceea8ea3/relevant-documents/?`).reply(
  200, getFirstRelevantDocuments('ceea8ea3', 50)
);

axiosMockClient.onGet(ALL_PINBOARD_URL).reply(function (config) {
  const authenticated = config.headers['Authorization'] === 'Token 055a5575c1832e9123cd546fe0cfdc8607f8680c';

  if (authenticated) {
    const offset = get(config, 'params.offset');
    if (offset === '10') {
      return [200, secondPage];
    }
    return [200, firstPage];
  }
  return [200, emptyPagination];
});

axiosMockClient.onGet(
  RECENT_SEARCH_ITEMS_API_URL,
  { params: { 'officer_ids': ['1', '123'], 'crids': ['CR123', 'CR456', 'CR123456'], 'trr_ids': ['123', '456'] } },
).reply(
  200, recentSearchItems,
);

const updatedFromSourceFirstExamplePinboard = {
  'id': 'abcd1234',
  'title': 'Watts Crew',
  'officer_ids': [1],
  'crids': [],
  'trr_ids': [],
  'description': 'Officers with at least 10 complaints against them generate 64% of all complaints.',
};
const updatedFromSourceSecondExamplePinboard = {
  'id': 'abcd1234',
  'title': 'Skullcap Crew',
  'officer_ids': [2],
  'crids': [],
  'trr_ids': [],
  'description': 'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang.',
};
axiosMockClient.onPut(
  `${PINBOARDS_URL}abcd1234/`,
  { 'source_pinboard_id': 'b20c2c36' }
).reply(200, updatedFromSourceFirstExamplePinboard);

axiosMockClient.onPut(
  `${PINBOARDS_URL}abcd1234/`,
  { 'source_pinboard_id': '22e66085' }
).reply(200, updatedFromSourceSecondExamplePinboard);
axiosMockClient.onGet(`${PINBOARDS_URL}abcd1234/officers/`).reply(200, fetchPinboardOfficers());

axiosMockClient.onGet(`${PINBOARDS_URL}3664a7ea/trrs/`).reply(200, fetchPinboardTRRs());

// === Test current officer pinboard feature ===
axiosMockClient.onGet(PINBOARDS_URL, { params: { detail: true } }).reply(200, pinboardsMenu.pinboards);
axiosMockClient.onGet(`${PINBOARDS_URL}8d2daffe/`).reply(200, pinboardsMenu.pinboards[0]);
axiosMockClient
  .onPut(`${PINBOARDS_URL}8d2daffe/`, pinboardsMenu.updateRequestParams[0])
  .reply(200, pinboardsMenu.updatedPinboards[0]);
axiosMockClient
  .onPost(PINBOARDS_URL, pinboardsMenu.createPinboardRequestParams[0])
  .reply(201, pinboardsMenu.createdPinboards[0]);
axiosMockClient
  .onGet(`${PINBOARDS_URL}${pinboardsMenu.createdPinboards[0].id}/`)
  .reply(201, pinboardsMenu.createdPinboards[0]);
axiosMockClient
  .onGet(`${PINBOARDS_URL}${pinboardsMenu.createdPinboards[0].id}/officers/`)
  .reply(200, [getSummaryData()]);
// === End test current officer pinboard feature ===

// === Test current cr pinboard feature ===
axiosMockClient
  .onPut(`${PINBOARDS_URL}8d2daffe/`, pinboardsMenu.updateRequestParams[1])
  .reply(200, pinboardsMenu.updatedPinboards[1]);
axiosMockClient
  .onPost(PINBOARDS_URL, pinboardsMenu.createPinboardRequestParams[1])
  .reply(201, pinboardsMenu.createdPinboards[1]);
axiosMockClient
  .onGet(`${PINBOARDS_URL}${pinboardsMenu.createdPinboards[1].id}/`)
  .reply(201, pinboardsMenu.createdPinboards[1]);
axiosMockClient
  .onGet(`${PINBOARDS_URL}${pinboardsMenu.createdPinboards[1].id}/complaints/`)
  .reply(200, [getCRData()]);
// === End current cr pinboard feature ===

axiosMockClient.onPost(`${PINBOARDS_URL}`).reply(201, createPinboard());
axiosMockClient.onGet(PINBOARDS_URL).reply(200, pinboardsList);

const notFoundError = [404, {}];
mockUpdatePinboardError(axiosMockClient, '5cd0aaaa', 999, notFoundError);
mockUpdatePinboardError(axiosMockClient, '5cd0bbbb', 150, notFoundError);

const networkError = Promise.reject(new Error('Network Error'));
mockUpdatePinboardError(axiosMockClient, '5cd0dddd', 99, networkError);
mockUpdatePinboardError(axiosMockClient, '5cd0eeee', 10, networkError);
mockUpdatePinboardError(axiosMockClient, '5cd0ffff', 4, networkError);

axiosMockClient.onGet(TOAST_API_URL).reply(200, getToasts());
axiosMockClient.onGet(APP_CONFIG_API_URL).reply(200, getAppConfig());

module.exports = axiosMockClient;
