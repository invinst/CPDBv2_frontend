import { LANDING_PAGE_ID } from 'utils/constants';
import { getOfficerId, getCRID, getUnitName } from 'utils/location';
import { getOfficerId as getOfficerIdFromState } from 'selectors/officer-page';
import { communitiesSelector } from 'selectors/landing-page/heat-map';
import { citySummarySelector } from 'selectors/landing-page/city-summary';
import { getCRID as getCridFromState } from 'selectors/cr-page';
import { faqsRequested } from 'selectors/faq-page/faqs-selector';
import { hasLoadingPageContent } from 'selectors/cms';
import { hasCards as hasOfficerByAllegationData } from 'selectors/landing-page/officers-by-allegation';
import { hasCards as hasRecentActivityData } from 'selectors/landing-page/activity-grid';
import { hasCards as hasRecentDocumentData } from 'selectors/landing-page/recent-document';
import { hasCards as hasComplaintSummaryData } from 'selectors/landing-page/complaint-summaries';
import { getCitySummary } from 'actions/landing-page/city-summary';
import { fetchOfficerSummary, changeOfficerId } from 'actions/officer-page';
import { fetchSocialGraph } from 'actions/officer-page/social-graph';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';
import { getCommunities } from 'actions/landing-page/heat-map';
import { fetchCR } from 'actions/cr-page';
import { fetchUnitProfileSummary } from 'actions/unit-profile-page';
import { requestFAQs } from 'actions/faq-page';
import { fetchPage } from 'actions/cms';
import { requestOfficersByAllegation } from 'actions/landing-page/officers-by-allegation';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import { getRecentDocument } from 'actions/landing-page/recent-document';
import { getComplaintSummaries } from 'actions/landing-page/complaint-summaries';

export default store => next => action => {
  const result = next(action);
  if (action.type !== '@@router/LOCATION_CHANGE') {
    return result;
  }

  const state = store.getState();

  if (!hasLoadingPageContent(state)) {
    store.dispatch(fetchPage(LANDING_PAGE_ID)());
  }

  if (action.payload.pathname.match(/officer\/\d+/)) {
    const officerId = getOfficerId(action.payload.pathname);
    const oldOfficerId = getOfficerIdFromState(state);
    if (officerId !== oldOfficerId) {
      store.dispatch(changeOfficerId(officerId));
      store.dispatch(fetchOfficerSummary(officerId));
      store.dispatch(fetchSocialGraph(officerId));
      store.dispatch(fetchNewTimelineItems(officerId));
    }
  } else if (action.payload.pathname === '/') {
    const communities = communitiesSelector(state);
    const citySummary = citySummarySelector(state);
    if (communities === null) {
      store.dispatch(getCommunities());
    }
    if (citySummary.allegationCount === undefined) {
      store.dispatch(getCitySummary());
    }
    if (!hasOfficerByAllegationData(state)) {
      store.dispatch(requestOfficersByAllegation());
    }
    if (!hasRecentActivityData(state)) {
      store.dispatch(requestActivityGrid());
    }
    if (!hasRecentDocumentData(state)) {
      store.dispatch(getRecentDocument());
    }

    if (!hasComplaintSummaryData(state)) {
      store.dispatch(getComplaintSummaries());
    }

  } else if (action.payload.pathname.match(/complaint\/\d+/)) {
    const crid = getCRID(action.payload.pathname);
    const oldCrid = getCridFromState(state);
    if (crid != oldCrid) {
      store.dispatch(fetchCR(crid));
    }
  } else if (action.payload.pathname.match(/unit\/\d+/)) {
    const unitName = getUnitName(action.payload.pathname);
    store.dispatch(fetchUnitProfileSummary(unitName));
  } else if (action.payload.pathname.match(/faq/)) {
    if (!faqsRequested(state)) {
      store.dispatch(requestFAQs());
    }
  }

  return result;
};
