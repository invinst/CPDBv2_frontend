import { Promise } from 'es6-promise';
import { every } from 'lodash';

import { LANDING_PAGE_ID, OFFICER_PAGE_ID, CR_PAGE_ID, TRR_PAGE_ID } from 'utils/constants';
import { getOfficerId, getCRID, getTRRId, getUnitName, getDocumentId } from 'utils/location';
import { hasCommunitiesSelector, hasClusterGeoJsonData } from 'selectors/landing-page/heat-map';
import { hasCitySummarySelector } from 'selectors/landing-page/city-summary';
import { hasCMSContent } from 'selectors/cms';
import { hasCards as hasOfficerByAllegationData } from 'selectors/landing-page/officers-by-allegation';
import { hasCards as hasRecentActivityData } from 'selectors/landing-page/activity-grid';
import { hasCards as hasRecentDocumentData } from 'selectors/landing-page/recent-document';
import { hasCards as hasComplaintSummaryData } from 'selectors/landing-page/complaint-summaries';
import { getCitySummary } from 'actions/landing-page/city-summary';
import { fetchOfficerSummary, changeOfficerId, requestCreateOfficerZipFile } from 'actions/officer-page';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';
import { fetchCoaccusals } from 'actions/officer-page/coaccusals';
import { getCommunities, getClusterGeoJson } from 'actions/landing-page/heat-map';
import { fetchCR } from 'actions/cr-page';
import { fetchTRR } from 'actions/trr-page';
import { fetchDocument } from 'actions/document-pape';
import { fetchUnitProfileSummary } from 'actions/unit-profile-page';
import { fetchPage } from 'actions/cms';
import { requestOfficersByAllegation } from 'actions/landing-page/officers-by-allegation';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import { getRecentDocument } from 'actions/landing-page/recent-document';
import { getComplaintSummaries } from 'actions/landing-page/complaint-summaries';
import { pageLoadFinish, pageLoadStart } from 'actions/page-loading';
import { fetchPopup } from 'actions/popup';
import { requestSearchTermCategories } from 'actions/search-page/search-terms';

let prevPathname = '';

export default store => next => action => {
  const result = next(action);
  if (action.type !== '@@router/LOCATION_CHANGE') {
    return result;
  }

  const state = store.getState();
  const dispatches = [];

  const getCMSContent = (pageId) => {
    if (!hasCMSContent(pageId)(state)) {
      dispatches.push(store.dispatch(fetchPage(pageId)()));
    }
  };

  const notRequiredLandingPageContent = [/embed\/map/];
  if (every(notRequiredLandingPageContent, item => !action.payload.pathname.match(item))) {
    getCMSContent(LANDING_PAGE_ID);
  }

  if (action.payload.pathname.match(/officer\/\d+/)) {
    const officerId = getOfficerId(action.payload.pathname);
    const oldOfficerId = getOfficerId(prevPathname);
    if (officerId !== oldOfficerId) {
      dispatches.push(store.dispatch(changeOfficerId(officerId)));
      dispatches.push(store.dispatch(fetchOfficerSummary(officerId)));
      dispatches.push(store.dispatch(fetchNewTimelineItems(officerId)));
      dispatches.push(store.dispatch(fetchCoaccusals(officerId)));
      dispatches.push(store.dispatch(requestCreateOfficerZipFile(officerId)));
      dispatches.push(store.dispatch(fetchPopup('officer')));
    }
    getCMSContent(OFFICER_PAGE_ID);
  }

  else if (action.payload.pathname.match(/^\/(edit\/?)?$/)) {
    if (!hasCommunitiesSelector(state)) {
      dispatches.push(store.dispatch(getCommunities()));
    }
    if (!hasCitySummarySelector(state)) {
      dispatches.push(store.dispatch(getCitySummary()));
    }
    if (!hasClusterGeoJsonData(state)) {
      dispatches.push(store.dispatch(getClusterGeoJson()));
    }

    if (!hasOfficerByAllegationData(state)) {
      dispatches.push(store.dispatch(requestOfficersByAllegation()));
    }
    if (!hasRecentActivityData(state)) {
      dispatches.push(store.dispatch(requestActivityGrid()));
    }
    if (!hasRecentDocumentData(state)) {
      dispatches.push(store.dispatch(getRecentDocument()));
    }

    if (!hasComplaintSummaryData(state)) {
      dispatches.push(store.dispatch(getComplaintSummaries()));
    }
  }

  else if (action.payload.pathname.match(/complaint\/\w+/)) {
    const crid = getCRID(action.payload.pathname);
    const oldCrid = getCRID(prevPathname);
    if (crid !== oldCrid) {
      dispatches.push(store.dispatch(fetchCR(crid)));
      dispatches.push(store.dispatch(fetchPopup('complaint')));
    }
    getCMSContent(CR_PAGE_ID);
  }

  else if (action.payload.pathname.match(/unit\/\d+/)) {
    const unitName = getUnitName(action.payload.pathname);
    dispatches.push(store.dispatch(fetchUnitProfileSummary(unitName)));
  }

  else if (action.payload.pathname.match(/trr\/\d+/)) {
    const trrId = getTRRId(action.payload.pathname);
    const oldTrrId = getTRRId(prevPathname);
    if (trrId !== oldTrrId) {
      dispatches.push(store.dispatch(fetchTRR(trrId)));
      dispatches.push(store.dispatch(fetchPopup('trr')));
    }
    getCMSContent(TRR_PAGE_ID);
  }

  else if (action.payload.pathname.match(/document\/\d+/)) {
    const documentId = getDocumentId(action.payload.pathname);
    dispatches.push(store.dispatch(fetchDocument(documentId)));
  }

  else if (action.payload.pathname.match(/search\/terms/)) {
    dispatches.push(store.dispatch(requestSearchTermCategories()));
  }

  else if (action.payload.pathname.match(/embed\/top-officers/)) {
    if (!hasOfficerByAllegationData(state)) {
      dispatches.push(store.dispatch(requestOfficersByAllegation()));
    }
  }

  else if (action.payload.pathname.match(/embed\/map/)) {
    if (!hasCommunitiesSelector(state)) {
      dispatches.push(store.dispatch(getCommunities()));
    }
    if (!hasClusterGeoJsonData(state)) {
      dispatches.push(store.dispatch(getClusterGeoJson()));
    }
    if (!hasCitySummarySelector(state)) {
      dispatches.push(store.dispatch(getCitySummary()));
    }
  }

  if (dispatches.length > 0) {
    store.dispatch(pageLoadStart());
    Promise.all(dispatches).finally(() => {
      store.dispatch(pageLoadFinish());
    });
  }

  prevPathname = action.payload.pathname;

  return result;
};
