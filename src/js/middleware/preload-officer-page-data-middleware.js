import { getOfficerId, hasOfficerIdChanged } from 'utils/location';
import { fetchOfficerSummary, changeOfficerId } from 'actions/officer-page';
import { fetchSocialGraph } from 'actions/officer-page/social-graph';
import { fetchTimelineItems, fetchMinimap } from 'actions/officer-page/timeline';


export default store => next => action => {
  const state = store.getState();
  if (hasOfficerIdChanged(action, state.officerPage.officerId)) {
    const nextOfficerId = getOfficerId(action.payload.pathname);
    store.dispatch(changeOfficerId(nextOfficerId));
    store.dispatch(fetchOfficerSummary(nextOfficerId));
    store.dispatch(fetchSocialGraph(nextOfficerId));
    store.dispatch(fetchTimelineItems(nextOfficerId, {}));
    store.dispatch(fetchMinimap(nextOfficerId));
  }
  return next(action);
};
