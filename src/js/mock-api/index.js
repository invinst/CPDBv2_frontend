import config from 'config';
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
  CRAWLERS_API_URL,
  SOCIAL_GRAPH_NETWORK_API_URL,
  PINBOARDS_URL,
  SOCIAL_GRAPH_GEOGRAPHIC_API_URL,
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
import getSearchTermsData from './search-terms-page';
import getUnitSummaryData from './unit-profile-page/get-summary';
import { getCRPopup } from './popup';
import { getCommunity } from './community';
import fetchDocumentsByCRID from './document-deduplicator-page/fetch-documents-by-crid';
import searchDocuments from './documents-overview-page/search-documents';
import fetchDocuments from './documents-overview-page/fetch-documents';
import fetchDocumentByID from './document-page/fetch-document-by-id';
import { getCrawlersData, getNextCrawlersData } from './crawlers-page/crawlers-page';
import {
  getDefaultSocialGraphData,
  getOfficerComplaintSocialGraphData,
  getThresholdThreeSocialGraphData
} from './social-graph-page/social-graph-page';
import { createPinboard, fetchPinboard, updatePinboard } from './pinboard';
import {
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from './pinboard-page/fetch-pinned-items';
import { getSocialGraphData } from './pinboard-page/social-graph';
import { getPinboardGeographicData } from './pinboard-page/geographic-data';
import { getSocialGraphGeographicData } from './social-graph-page/geographic-data';


const SEARCH_API_URL = /^suggestion\/$/;
const SEARCH_SINGLE_API_URL = /^suggestion\/single\/$/;
/* istanbul ignore next */

axiosMockClient.onGet(ACTIVITY_GRID_API_URL).reply(() => [200, getActivityGridData()]);
axiosMockClient.onGet(OFFICERS_BY_ALLEGATION_API_URL).reply(() => [200, getTopByAllegationData()]);
axiosMockClient.onGet(OFFICER_URL, { params: { ids: '1,2,3' } }).reply(() => [200, getOfficersData('1,2,3')]);
axiosMockClient.onGet(RECENT_DOCUMENT_URL).reply(() => [200, getRecentDocument(24)]);
axiosMockClient.onGet(RECENT_COMPLAINT_SUMMARIES_URL).reply(() => [200, getComplaintSummaries(20)]);

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
    'detail': 'invalid@email.com looks fake or invalid, please enter a real email address.', 'success': false
  });

axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'Ke', contentType: 'OFFICER' } }).reply(() => {
  return [200, singleGroupSuggestions.default];
});
axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'Ke', contentType: 'NEIGHBORHOOD' } }).reply(() => {
  return [200, singleGroupSuggestions.neighborhoods];
});
axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'Ke', contentType: 'OFFICER', offset: '20' } })
  .reply(() => { return [200, singleGroupSuggestions.offset20]; });

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

axiosMockClient.onGet(`${OFFICER_URL}1/new-timeline-items/`).reply(200, getNewTimelineItemsData());
axiosMockClient.onGet(`${OFFICER_URL}1/coaccusals/`).reply(200, getCoaccusalsData());

axiosMockClient.onGet(`${UNIT_PROFILE_URL}001/summary/`).reply(200, getUnitSummaryData());

axiosMockClient.onGet(SEARCH_TERMS_CATEGORIES_API_URL).reply(200, getSearchTermsData());

axiosMockClient.onGet(CITY_SUMMARY_API_URL).reply(200, getCitySummary());
axiosMockClient.onGet(communityGeoJSONPath).reply(200, getCommunities());

axiosMockClient.onGet(`${SLUG_PAGE_API_URL}landing-page/`).reply(200, landingPageCMSFields);
axiosMockClient.onGet(`${SLUG_PAGE_API_URL}officer-page/`).reply(200, officerPageCMSFields);

axiosMockClient.onGet(`${POPUP_API_URL}?page=complaint`).reply(200, getCRPopup());

axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { term: 'community', contentType: 'COMMUNITY' } })
  .reply(() => { return [200, getCommunity()]; });

axiosMockClient.onGet(`${DOCUMENTS_URL}`, { params: { crid: '1000000', limit: undefined, offset: undefined } })
  .reply(200, fetchDocumentsByCRID());

axiosMockClient.onGet(`${DOCUMENTS_URL}`, { params: { match: '123457' } }).reply(200, searchDocuments());

axiosMockClient.onPatch(`${DOCUMENTS_URL}1/`).reply(200, { show: false });

axiosMockClient.onGet(`${DOCUMENTS_URL}`).reply(200, fetchDocuments());

axiosMockClient.onGet(`${DOCUMENTS_URL}1/`).reply(function (config) {
  const authenticated = config.headers['Authorization'] === 'Token 055a5575c1832e9123cd546fe0cfdc8607f8680c';
  return [200, fetchDocumentByID(authenticated)];
});

axiosMockClient.onGet(CRAWLERS_API_URL).reply(function (config) {
  return [200, (config.params && config.params.offset === '20') ? getNextCrawlersData() : getCrawlersData()];
});

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'threshold': 2, 'show_civil_only': true, 'unit_id': '123' } }
).reply(200, getDefaultSocialGraphData());

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'threshold': 2, 'show_civil_only': false, 'unit_id': '123' } }
).reply(200, getOfficerComplaintSocialGraphData());

axiosMockClient.onGet(
  SOCIAL_GRAPH_NETWORK_API_URL,
  { params: { 'threshold': 3, 'show_civil_only': false, 'unit_id': '123' } }
).reply(200, getThresholdThreeSocialGraphData());

axiosMockClient.onPost(`${PINBOARDS_URL}`).reply(201, createPinboard());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/`).reply(200, fetchPinboard());

axiosMockClient.onPut(`${PINBOARDS_URL}5cd06f2b/`).reply(200, updatePinboard());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/complaints/`).reply(200, fetchPinboardComplaints());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/officers/`).reply(200, fetchPinboardOfficers());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/trrs/`).reply(200, fetchPinboardTRRs());

axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/social-graph/`).reply(200, getSocialGraphData());
axiosMockClient.onGet(`${PINBOARDS_URL}5cd06f2b/geographic-data/`).reply(200, getPinboardGeographicData());

axiosMockClient.onGet(
  SOCIAL_GRAPH_GEOGRAPHIC_API_URL,
  { params: { 'unit_id': '123' } }
).reply(200, getSocialGraphGeographicData());

/*istanbul ignore next*/
export function getMockAdapter() {
  if (config.appEnv === 'live-test') {
    return axiosMockClient.adapter();
  }
  return null;
}
