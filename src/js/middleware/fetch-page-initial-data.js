import { getOfficerId } from 'utils/location';
import { getOfficerId as getOfficerIdFromState } from 'selectors/officer-page';
import { communitiesSelector } from 'selectors/landing-page/heat-map';
import { citySummarySelector } from 'selectors/landing-page/city-summary';
import { getCitySummary } from 'actions/landing-page/city-summary';
import { fetchOfficerSummary, changeOfficerId } from 'actions/officer-page';
import { fetchSocialGraph } from 'actions/officer-page/social-graph';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';
import { getCommunities } from 'actions/landing-page/heat-map';


export default store => next => action => {
  const result = next(action);
  if (action.type !== '@@router/LOCATION_CHANGE') {
    return result;
  }

  const state = store.getState();
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
  }
  return result;
};
