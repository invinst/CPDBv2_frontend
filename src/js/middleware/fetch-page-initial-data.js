import { Promise } from 'es6-promise';
import { every, get } from 'lodash';

import {
  LANDING_PAGE_ID, OFFICER_PAGE_ID, CR_PAGE_ID, TRR_PAGE_ID,
  SIGNIN_REQUEST_SUCCESS, PINBOARD_HEX_ID_LENGTH,
} from 'utils/constants';
import {
  getOfficerId, getCRID, getTRRId, getUnitName,
  getDocDedupCRID, getDocumentId, getPinboardID
} from 'utils/location';
import { hasCommunitiesSelector, hasClusterGeoJsonData } from 'selectors/landing-page/heat-map';
import { hasCitySummarySelector } from 'selectors/landing-page/city-summary';
import { hasCMSContent } from 'selectors/cms';
import { hasCards as hasOfficerByAllegationData } from 'selectors/landing-page/officers-by-allegation';
import { hasCards as hasRecentActivityData } from 'selectors/landing-page/activity-grid';
import { hasCards as hasRecentDocumentData } from 'selectors/landing-page/recent-document';
import { hasCards as hasComplaintSummaryData } from 'selectors/landing-page/complaint-summaries';
import { getMatchParamater, getDocumentsOrder } from 'selectors/documents-overview-page';
import { getCRIDParameter } from 'selectors/document-deduplicator-page';
import { getCitySummary } from 'actions/landing-page/city-summary';
import { fetchOfficerSummary, changeOfficerId, requestCreateOfficerZipFile } from 'actions/officer-page';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';
import { fetchCoaccusals } from 'actions/officer-page/coaccusals';
import { getCommunities, getClusterGeoJson } from 'actions/landing-page/heat-map';
import { fetchCR } from 'actions/cr-page';
import { fetchTRR } from 'actions/trr-page';
import { fetchDocument } from 'actions/document-page';
import { fetchUnitProfileSummary } from 'actions/unit-profile-page';
import { fetchPage } from 'actions/cms';
import { requestOfficersByAllegation } from 'actions/landing-page/officers-by-allegation';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import { getRecentDocument } from 'actions/landing-page/recent-document';
import { getComplaintSummaries } from 'actions/landing-page/complaint-summaries';
import { pageLoadFinish, pageLoadStart } from 'actions/page-loading';
import { fetchPopup } from 'actions/popup';
import { requestSearchTermCategories } from 'actions/search-page/search-terms';
import { fetchDocumentsByCRID } from 'actions/document-deduplicator-page';
import { fetchDocuments } from 'actions/documents-overview-page';
import { cancelledByUser } from 'utils/axios-client';
import { requestCrawlers } from 'actions/crawlers-page';
import { fetchPinboard, fetchPinboardSocialGraph, fetchPinboardRelevantCoaccusals } from 'actions/pinboard';

let prevPathname = '';

const handleFetchingDocumentPage = (dispatches, store, pathname) => {
  const documentId = getDocumentId(pathname);
  dispatches.push(store.dispatch(fetchDocument(documentId)));
};

export default store => next => action => {
  const result = next(action);

  const state = store.getState();
  const dispatches = [];

  if (action.type === SIGNIN_REQUEST_SUCCESS) {
    if (state.pathname.match(/document\/\d+/)) {
      handleFetchingDocumentPage(dispatches, store, state.pathname);
    }
  }

  else if (action.type === '@@router/LOCATION_CHANGE') {
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
      handleFetchingDocumentPage(dispatches, store, action.payload.pathname);
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

    else if (action.payload.pathname.match(/\/documents\/crid\//)) {
      const previousCRID = getCRIDParameter(state);
      const currentCRID = getDocDedupCRID(action.payload.pathname);
      if (currentCRID !== previousCRID) {
        dispatches.push(store.dispatch(fetchDocumentsByCRID({ crid: currentCRID })));
      }
    }

    else if (action.payload.pathname.match(/\/documents\//)) {
      const previousMatch = getMatchParamater(state);
      const currentMatch = get(action.payload.query, 'match', '');
      const previousDataOrders = getDocumentsOrder(state);
      let params = {};

      if (currentMatch !== '') {
        params = { match: currentMatch };
      }

      if (
          currentMatch !== previousMatch ||
          (currentMatch === '' && previousDataOrders.length === 0)
      ) {
        dispatches.push(store.dispatch(fetchDocuments(params)).catch(cancelledByUser));
      }
    }

    else if (action.payload.pathname.match(/\/crawlers\//)) {
      dispatches.push(store.dispatch(requestCrawlers()));
    }

    else if (action.payload.pathname.match(/\/pinboard\/[a-fA-F0-9]+\//)) {
      const pinboardID = getPinboardID(action.payload.pathname);
      if (pinboardID.length == PINBOARD_HEX_ID_LENGTH) {
        dispatches.push(store.dispatch(fetchPinboard(pinboardID)));
        dispatches.push(store.dispatch(fetchPinboardSocialGraph(pinboardID)));
        dispatches.push(store.dispatch(fetchPinboardRelevantCoaccusals(pinboardID)));
      }
    }

    prevPathname = action.payload.pathname;
  }

  if (dispatches.length > 0) {
    store.dispatch(pageLoadStart());
    Promise.all(dispatches).finally(() => {
      store.dispatch(pageLoadFinish());
    });
  }

  return result;
};
