import { getSelectedItemIndex, getTimelineItems } from 'selectors/officer-page/timeline';

import { fetchTimelineItems } from 'actions/officer-page/timeline';
import { OFFICER_TIMELINE_SELECT_MINIMAP_ITEM } from 'utils/constants';

import { size } from 'lodash';

export default store => next => action => {
  const result = next(action);
  if (action.type === OFFICER_TIMELINE_SELECT_MINIMAP_ITEM) {
    const state = store.getState();
    const index = getSelectedItemIndex(state);
    const items = getTimelineItems(state);
    const officerId = state.officerPage.officerId;
    if (index >= size(items)) {
      const offset = size(items);
      const minLoadingCount = index - offset;
      const limit = minLoadingCount % 20 === 0 ? minLoadingCount : (Math.floor(minLoadingCount / 20) + 1) * 20;
      next(fetchTimelineItems(officerId)({ limit, offset }));
    }
  }
  return result;
};
