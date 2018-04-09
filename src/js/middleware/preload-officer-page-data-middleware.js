import { getOfficerId, hasOfficerIdChanged } from 'utils/location';
import { fetchOfficerSummary, changeOfficerId, fetchOfficerMetrics } from 'actions/officer-page';
import { fetchSocialGraph } from 'actions/officer-page/social-graph';
import { fetchNewTimelineItems } from 'actions/officer-page/new-timeline';
import { getOfficerId as getOfficerIdFromState } from 'selectors/officer-page';

export default store => next => action => {
  const isOfficerIdChange = hasOfficerIdChanged(action, getOfficerIdFromState(store.getState()));

  const result = next(action);

  if (isOfficerIdChange) {
    const nextOfficerId = getOfficerId(action.payload.pathname);
    store.dispatch(changeOfficerId(nextOfficerId));
    store.dispatch(fetchOfficerSummary(nextOfficerId));
    store.dispatch(fetchOfficerMetrics(nextOfficerId));
    store.dispatch(fetchSocialGraph(nextOfficerId));
    store.dispatch(fetchNewTimelineItems(nextOfficerId));
  }

  return result;
};
