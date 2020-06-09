import { Promise } from 'es6-promise';
import { every, get, throttle } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import queryString from 'query-string';

import {
  LANDING_PAGE_ID, OFFICER_PAGE_ID, CR_PAGE_ID, TRR_PAGE_ID, PINBOARD_PAGE_ID,
  SIGNIN_REQUEST_SUCCESS, PINBOARD_HEX_ID_LENGTH,
} from 'utils/constants';
import {
  getOfficerId, getCRID, getTRRId, getUnitName,
  getDocDedupCRID, getDocumentId, getPinboardID,
} from 'utils/location';
import { hasCommunitiesSelector, hasClusterGeoJsonData } from 'selectors/landing-page/heat-map';
import { hasCitySummarySelector } from 'selectors/landing-page/city-summary';
import { hasCMSContent } from 'selectors/cms';
import { hasCards as hasOfficerByAllegationData } from 'selectors/landing-page/officers-by-allegation';
import { hasCards as hasRecentActivityData } from 'selectors/landing-page/activity-grid';
import { hasCards as hasRecentDocumentData } from 'selectors/landing-page/recent-document';
import { hasCategoriesSelector } from 'selectors/search-page/search-terms/categories';
import { hasCards as hasComplaintSummaryData } from 'selectors/landing-page/complaint-summaries';
import { getMatchParamater, getDocumentsOrder } from 'selectors/documents-overview-page';
import { getCRIDParameter } from 'selectors/document-deduplicator-page';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { getCitySummary } from 'actions/landing-page/city-summary';
import { fetchOfficerSummary, changeOfficerId, requestCreateOfficerZipFile } from 'actions/officer-page';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';
import { fetchCoaccusals } from 'actions/officer-page/coaccusals';
import { getCommunities, getClusterGeoJson } from 'actions/landing-page/heat-map';
import { fetchCR } from 'actions/cr-page';
import { fetchTRR } from 'actions/trr-page';
import { fetchDocument, fetchDocumentSuggestionTags } from 'actions/document-page';
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
import { fetchDocuments, fetchDocumentsAuthenticated } from 'actions/documents-overview-page';
import { cancelledByUser } from 'utils/axios-client';
import { requestCrawlers } from 'actions/crawlers-page';
import { fetchPinboard } from 'actions/pinboard';
import { fetchAllPinboards } from 'actions/pinboard-admin-page';
import { fetchVideoInfo } from 'actions/headers/slim-header';
import { hasVideoInfoSelector } from 'selectors/headers/slim-header';
import { isSignedInFromCookie } from 'utils/authentication';
import { fetchToast } from 'actions/toast';
import { hasToastsSelector } from 'selectors/toast';
import { fetchAppConfig } from 'actions/app-config';
import appConfig from 'utils/app-config';

let prevPathname = '';

const getMatchQuery = (action) => {
  return queryString.parse(get(action.payload.location, 'search', ''))['match'] || '';
};

const handleFetchingDocumentPage = (dispatches, store, pathname) => {
  const documentId = getDocumentId(pathname);
  dispatches.push(store.dispatch(fetchDocument(documentId)));
  if (isSignedInFromCookie()) {
    store.dispatch(fetchDocumentSuggestionTags());
  }
};

const handleFetchingDocumentsOverviewPage = (dispatches, store, state, action, fetch) => {
  const previousMatch = getMatchParamater(state);
  const currentMatch = getMatchQuery(action);
  const previousDataOrders = getDocumentsOrder(state);
  let params = {};

  if (currentMatch !== '') {
    params = { match: currentMatch };
  }

  if (
    action.type === SIGNIN_REQUEST_SUCCESS ||
    currentMatch !== previousMatch ||
    (currentMatch === '' && previousDataOrders.length === 0)
  ) {
    dispatches.push(store.dispatch(fetch(params)).catch(cancelledByUser));
  }
};

function handleFetchAllPinboards(store, action) {
  let params = {};

  const currentMatch = getMatchQuery(action);
  if (currentMatch !== '') {
    params = { match: currentMatch };
  }

  store.dispatch(fetchAllPinboards(params)).catch(cancelledByUser);
}

const throttledFetchAllPinboards = throttle(handleFetchAllPinboards, 500, { 'leading': false });

export default store => next => action => {
  const result = next(action);

  const state = store.getState();
  const dispatches = [];

  if (action.type === SIGNIN_REQUEST_SUCCESS) {
    if (state.pathname.match(/document\/\d+/)) {
      handleFetchingDocumentPage(dispatches, store, state.pathname);
    } else if (state.pathname.match(/\/documents\//)) {
      handleFetchingDocumentsOverviewPage(dispatches, store, state, action, fetchDocumentsAuthenticated);
    } else if (state.pathname.match(/\/view-all-pinboards\//)) {
      handleFetchAllPinboards(store, action);
    }
  }

  else if (action.type === LOCATION_CHANGE) {
    const pathName = action.payload.location.pathname;

    const getCMSContent = (pageId) => {
      if (!hasCMSContent(pageId)(state)) {
        dispatches.push(store.dispatch(fetchPage(pageId)()));
      }
    };

    if (!hasToastsSelector(state)) {
      store.dispatch(fetchToast());
    }

    if (appConfig.isEmpty()) {
      dispatches.push(store.dispatch(fetchAppConfig()));
    }

    const notRequiredLandingPageContent = [/embed\/map/];
    if (every(notRequiredLandingPageContent, item => !pathName.match(item))) {
      getCMSContent(LANDING_PAGE_ID);
    }

    if (pathName.match(/officer\/\d+/)) {
      const officerId = getOfficerId(pathName);
      const oldOfficerId = getOfficerId(prevPathname);
      if (officerId !== oldOfficerId) {
        dispatches.push(store.dispatch(changeOfficerId(officerId)));
        dispatches.push(store.dispatch(fetchOfficerSummary(officerId)));
        dispatches.push(store.dispatch(fetchNewTimelineItems(officerId)));
        dispatches.push(store.dispatch(fetchCoaccusals(officerId)));
        store.dispatch(requestCreateOfficerZipFile(officerId));
        store.dispatch(fetchPopup('officer'));
      }
      getCMSContent(OFFICER_PAGE_ID);
    }

    else if (pathName.match(/^\/(edit\/?)?(search\/?)?$/)) {
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

      if (!hasVideoInfoSelector(state)) {
        dispatches.push(store.dispatch(fetchVideoInfo()));
      }

      if (!hasCategoriesSelector(state)) {
        dispatches.push(store.dispatch(requestSearchTermCategories()));
      }
    }

    else if (pathName.match(/complaint\/\w+/)) {
      const crid = getCRID(pathName);
      const oldCrid = getCRID(prevPathname);
      if (crid !== oldCrid) {
        dispatches.push(store.dispatch(fetchCR(crid)));
        dispatches.push(store.dispatch(fetchPopup('complaint')));
      }
      getCMSContent(CR_PAGE_ID);
    }

    else if (pathName.match(/unit\/\d+/)) {
      const unitName = getUnitName(pathName);
      dispatches.push(store.dispatch(fetchUnitProfileSummary(unitName)));
    }

    else if (pathName.match(/trr\/\d+/)) {
      const trrId = getTRRId(pathName);
      const oldTrrId = getTRRId(prevPathname);
      if (trrId !== oldTrrId) {
        dispatches.push(store.dispatch(fetchTRR(trrId)));
        dispatches.push(store.dispatch(fetchPopup('trr')));
      }
      getCMSContent(TRR_PAGE_ID);
    }

    else if (pathName.match(/document\/\d+/)) {
      handleFetchingDocumentPage(dispatches, store, pathName);
    }

    else if (pathName.match(/embed\/top-officers/)) {
      if (!hasOfficerByAllegationData(state)) {
        dispatches.push(store.dispatch(requestOfficersByAllegation()));
      }
    }

    else if (pathName.match(/embed\/map/)) {
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

    else if (pathName.match(/\/documents\/crid\//)) {
      const previousCRID = getCRIDParameter(state);
      const currentCRID = getDocDedupCRID(pathName);
      if (currentCRID !== previousCRID) {
        dispatches.push(store.dispatch(fetchDocumentsByCRID({ crid: currentCRID })));
      }
    }

    else if (pathName.match(/\/edit\/documents\//)) {
      handleFetchingDocumentsOverviewPage(dispatches, store, state, action, fetchDocumentsAuthenticated);
    }

    else if (pathName.match(/\/documents\//)) {
      handleFetchingDocumentsOverviewPage(dispatches, store, state, action, fetchDocuments);
    }

    else if (pathName.match(/\/crawlers\//)) {
      dispatches.push(store.dispatch(requestCrawlers()));
    }

    else if (pathName.match(/\/pinboard\/([a-fA-F0-9]+\/)?/)) {
      const idOnPath = getPinboardID(pathName);
      const pinboard = getPinboard(state);
      const idInStore = pinboard.id;
      if (idOnPath && idOnPath.length === PINBOARD_HEX_ID_LENGTH) {
        if (idOnPath === idInStore) {
          if (!pinboard.hasPendingChanges) {
            dispatches.push(store.dispatch(fetchPinboard(idOnPath)));
          }
        } else {
          dispatches.push(store.dispatch(fetchPinboard(idOnPath)));
        }
      }

      getCMSContent(PINBOARD_PAGE_ID);
    }

    else if (pathName.match(/\/view-all-pinboards\//)) {
      throttledFetchAllPinboards(store, action);
    }

    prevPathname = pathName;
  }

  if (dispatches.length > 0) {
    store.dispatch(pageLoadStart());
    Promise.all(dispatches).finally(() => {
      store.dispatch(pageLoadFinish());
    });
  }

  return result;
};
