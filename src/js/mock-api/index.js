import axiosMockClient, { countRequests } from 'utils/axios-mock-client';
import {
  SIGNIN_URL, RESET_PASSWORD_URL, MAIL_CHIMP_URL, ACTIVITY_GRID_API_URL,
  REPORTS_API_URL, FAQS_API_URL, SEARCH_OFFICER_URL, OFFICER_URL, CR_URL, UNIT_PROFILE_URL,
  SEARCH_TERMS_CATEGORIES_API_URL, OFFICERS_BY_ALLEGATION_API_URL, CITY_SUMMARY_API_URL,
  RECENT_DOCUMENT_URL, RECENT_COMPLAINT_SUMMARIES_URL, LANDING_PAGE_API_URL
} from 'utils/constants';

import OfficerFactory from 'utils/test/factories/officer';
import reportingPageGetData from './reporting-page/get-data';
import FAQPageGetData from './faq-page/get-data';
import { groupedSuggestions, singleGroupSuggestions } from './landing-page/suggestions';
import getSummaryData from './officer-page/get-summary';
import getMinimapData, { filterMinimapItem } from './officer-page/get-minimap';
import getSocialGraphData from './officer-page/get-social-graph';
import getTimelineItemsData, {
  reversedTimelineItems,
  nextTimelineItems,
  filterTimelineItems
} from './officer-page/get-timeline-item';
import getCRData from './cr-page/get-data';
import getCRDataNoAttachment from './cr-page/get-data-no-attachment';
import getUnitSummaryData from './unit-profile-page/get-summary';
import getActivityGridData from './landing-page/activity-grid';
import getRecentDocument from './landing-page/recent-document';
import getComplaintSummaries from './landing-page/complaint-summaries';
import getSearchTermsData from './search-terms-page';
import { getCitySummary, getCommunities } from './landing-page/heat-map';
import { communityGeoJSONPath } from 'utils/static-assets';
import { getCMSFields } from './landing-page/cms-field';


const SEARCH_API_URL = /^suggestion\/([^/]*)\/$/;
const SEARCH_SINGLE_API_URL = /^suggestion\/([^/]*)\/single\/$/;
/* istanbul ignore next */
axiosMockClient.onGet(REPORTS_API_URL).reply(() => [200, reportingPageGetData()]);
/* istanbul ignore next */
axiosMockClient.onGet(new RegExp(`${FAQS_API_URL}\?.+`)).reply(() => [200, FAQPageGetData()]);

axiosMockClient.onGet(ACTIVITY_GRID_API_URL).reply(() => [200, getActivityGridData()]);
axiosMockClient.onGet(OFFICERS_BY_ALLEGATION_API_URL).reply(() => [200, getActivityGridData(48)]);
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

axiosMockClient.onPost(`${CR_URL}2/request-document/`, { email: 'valid@email.com' })
  .reply(200, { 'message': 'Thanks for subscribing.', crid: 2 });
axiosMockClient.onPost(`${CR_URL}2/request-document/`, { email: 'invalid@email.com' })
  .reply(400, { 'message': 'Sorry, we can not subscribe your email' });


// remove "/" from beginning of any v1 path for axios mock adapter to work.
let mailChimpUrl = MAIL_CHIMP_URL.slice(1);
axiosMockClient.onPost(mailChimpUrl, { email: 'valid@email.com' }).reply(200, { 'success': true });
axiosMockClient.onPost(mailChimpUrl, { email: 'invalid@email.com' })
  .reply(400, {
    'detail': 'invalid@email.com looks fake or invalid, please enter a real email address.', 'success': false
  });

axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { contentType: 'OFFICER' } }).reply(() => {
  return [200, singleGroupSuggestions.default];
});
axiosMockClient.onGet(SEARCH_SINGLE_API_URL, { params: { contentType: 'OFFICER', offset: '20' } }).reply(() => {
  return [200, singleGroupSuggestions.offset20];
});

axiosMockClient.onGet(SEARCH_API_URL).reply(function (config) {
  const matchs = SEARCH_API_URL.exec(config.url);
  return [200, groupedSuggestions[config.params.contentType || matchs[1]] || groupedSuggestions['default']];
});

axiosMockClient.onGet(`${SEARCH_OFFICER_URL}foo/`).reply(() => [200, OfficerFactory.buildList(3)]);
axiosMockClient.onGet(`${SEARCH_OFFICER_URL}notfound/`).reply(200, []);

axiosMockClient.onGet(`${OFFICER_URL}1/summary/`).reply(countRequests(() => [200, getSummaryData()]));
axiosMockClient.onGet(`${OFFICER_URL}1/social-graph/`).reply(countRequests(() => [200, getSocialGraphData()]));

axiosMockClient.onGet(`${CR_URL}1/`).reply(200, getCRData());
axiosMockClient.onGet(`${CR_URL}2/`).reply(200, getCRDataNoAttachment());


axiosMockClient.onGet(`${OFFICER_URL}1/timeline-items/`, { params: { limit: 20, offset: 10 } })
  .reply(countRequests(() => [200, nextTimelineItems()]));
axiosMockClient.onGet(`${OFFICER_URL}1/timeline-items/`, { params: { limit: 0, offset: 10 } })
  .reply(countRequests(() => [200, nextTimelineItems()]));
axiosMockClient.onGet(`${OFFICER_URL}1/timeline-items/`, { params: { offset: '10' } })
  .reply(countRequests(() => [200, nextTimelineItems()]));
axiosMockClient.onGet(`${OFFICER_URL}1/timeline-items/`, { params: { sort: 'asc' } })
  .reply(countRequests(() => [200, reversedTimelineItems()]));
axiosMockClient.onGet(`${OFFICER_URL}1/timeline-items/`, { params: { category: 'Use of Force', race: 'Black' } })
  .reply(countRequests(() => [200, filterTimelineItems('category=Use%20of%20Force&race=Black')]));
axiosMockClient.onGet(`${OFFICER_URL}1/timeline-items/`, { params: { category: 'Use of Force' } })
  .reply(countRequests(() => [200, filterTimelineItems('category=Use%20of%20Force')]));

axiosMockClient.onGet(`${OFFICER_URL}1/timeline-items/`).reply(countRequests(() => [200, getTimelineItemsData()]));
axiosMockClient.onGet(`${OFFICER_URL}1/timeline-minimap/`, { params: { category: 'Use of Force', race: 'Black' } })
  .reply(countRequests(() => [200, filterMinimapItem('category=Use%20of%20Force&race=Black')]));
axiosMockClient.onGet(`${OFFICER_URL}1/timeline-minimap/`, { params: { category: 'Use of Force' } })
  .reply(countRequests(() => [200, filterMinimapItem('category=Use%20of%20Force')]));
axiosMockClient.onGet(`${OFFICER_URL}1/timeline-minimap/`).reply(countRequests(() => [200, getMinimapData()]));
axiosMockClient.onGet(`${OFFICER_URL}1234/timeline-minimap/`).reply(countRequests(() => [200, getMinimapData(1234)]));
axiosMockClient.onGet(`${OFFICER_URL}1234/timeline-items/`)
  .reply(countRequests(() => [200, getTimelineItemsData(1234)]));

axiosMockClient.onGet(`${OFFICER_URL}5678/timeline-minimap/`).reply(countRequests(() => [200, getMinimapData(5678)]));
axiosMockClient.onGet(`${OFFICER_URL}5678/timeline-items/`)
  .reply(countRequests(() => [200, getTimelineItemsData(5678)]));

axiosMockClient.onGet(`${UNIT_PROFILE_URL}001/summary/`).reply(200, getUnitSummaryData());

axiosMockClient.onGet(SEARCH_TERMS_CATEGORIES_API_URL).reply(200, getSearchTermsData());

axiosMockClient.onGet(CITY_SUMMARY_API_URL).reply(200, getCitySummary());
axiosMockClient.onGet(communityGeoJSONPath).reply(200, getCommunities());

axiosMockClient.onGet(LANDING_PAGE_API_URL).reply(200, getCMSFields());

/*istanbul ignore next*/
export function getMockAdapter() {
  if (global.LIVE_TEST !== undefined) {
    return axiosMockClient.adapter();
  }
  return null;
}
