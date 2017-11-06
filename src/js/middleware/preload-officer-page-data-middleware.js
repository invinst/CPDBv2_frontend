import { getOfficerId, hasOfficerIdChanged, isRedirectingToOfficerTimelinePage } from 'utils/location';
import { fetchOfficerSummary, changeOfficerId } from 'actions/officer-page';
import { fetchSocialGraph } from 'actions/officer-page/social-graph';
import {
  fetchTimelineFirstItems,
  changeTimelineFilters,
  clearSelectedItemIndex,
} from 'actions/officer-page/timeline';
import {
  fetchMinimapThenSelectTimelineItem,
  selectLatestMinimapItemInYear
} from 'actions/officer-page/timeline-minimap';
import { getTimelineFilters } from 'selectors/officer-page/timeline';
import { getOfficerId as getOfficerIdFromState } from 'selectors/officer-page';
import { isEqual } from 'lodash';

export default store => next => action => {
  const isOfficerIdChange = hasOfficerIdChanged(action, getOfficerIdFromState(store.getState()));

  if (isRedirectingToOfficerTimelinePage(action)) {
    const oldQuery = getTimelineFilters(store.getState());
    const year = action.payload.query.year;
    store.dispatch(changeTimelineFilters(action.payload.query));
    const newQuery = getTimelineFilters(store.getState());

    if (!isEqual(newQuery, oldQuery) && !isOfficerIdChange) {
      store.dispatch(clearSelectedItemIndex());
      const officerId = getOfficerId(action.payload.pathname);
      store.dispatch(fetchTimelineFirstItems(officerId, newQuery));
      store.dispatch(fetchMinimapThenSelectTimelineItem(officerId, newQuery, year));
    }
    else if (!isOfficerIdChange) {
      store.dispatch(selectLatestMinimapItemInYear(year));
    }
  }

  if (isOfficerIdChange) {
    const nextOfficerId = getOfficerId(action.payload.pathname);
    store.dispatch(changeOfficerId(nextOfficerId));
    store.dispatch(fetchOfficerSummary(nextOfficerId));
    store.dispatch(fetchSocialGraph(nextOfficerId));
    store.dispatch(fetchTimelineFirstItems(nextOfficerId, getTimelineFilters(store.getState())));
    store.dispatch(
      fetchMinimapThenSelectTimelineItem(
        nextOfficerId,
        getTimelineFilters(store.getState()),
        action.payload.query.year
      )
    );
  }

  return next(action);
};
