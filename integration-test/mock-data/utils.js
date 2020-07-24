import api from '../mock-api';
import { toastsData, appConfigData } from './common';
import { emptyCreatedPinboard } from './pinboard-page/common';
import {
  activityGridOfficersData,
  citySummaryData,
  clusterData,
  communityData,
  complaintSummariesData,
  landingPageCmsData,
  listByNewDocumentData,
  topOfficersByAllegationData,
} from './landing-page/common';
import { searchTermsData } from './search-terms-page';


export const mockCommonApi = () => {
  api.onGet('/api/v2/toast/').reply(200, toastsData);
  api.onGet('/api/v2/app-config/').reply(200, appConfigData);
  api.onGet('/api/v2/pinboards/latest-retrieved-pinboard/').reply(200, {});
};

export const mockCommonPinboardApi = () => {
  mockCommonApi();
  api.onGet('/api/v2/pinboards/latest-retrieved-pinboard/', { 'create': true }).reply(200, emptyCreatedPinboard);
  api.onPost('/api/v2/pinboards/').reply(201, emptyCreatedPinboard);
};

export const mockLandingPageApi = () => {
  api.onGet('/heatmap/community.geojson').reply(200, communityData);
  api.onGet('/heatmap/cluster.geojson').reply(200, clusterData);
  api.onGet('/api/v2/search-term-categories/').reply(200, searchTermsData);
  api.onGet('/api/v2/cms-pages/landing-page/').reply(200, landingPageCmsData);
  api.onGet('/api/v2/city-summary/').reply(200, citySummaryData);
  api.onGet('/api/v2/officers/top-by-allegation/').reply(200, topOfficersByAllegationData);
  api.onGet('/api/v2/activity-grid/').reply(200, activityGridOfficersData);
  api.onGet('/api/v2/cr/list-by-new-document/').reply(200, listByNewDocumentData);
  api.onGet('/api/v2/cr/complaint-summaries/').reply(200, complaintSummariesData);
  api.onGet('/api/v1/suggestion/').reply(200, {});
};
