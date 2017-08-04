import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_SELECT_MINIMAP_ITEM, OFFICER_TIMELINE_FLIP_SORT_ORDER, OFFICER_TIMELINE_SELECT_TIMELINE_ITEM,
  CHANGE_OFFICER_ID
} from 'utils/constants';

export default handleActions({
  [OFFICER_TIMELINE_SELECT_MINIMAP_ITEM]: (state, { payload }) => payload,
  [OFFICER_TIMELINE_SELECT_TIMELINE_ITEM]: (state, { payload }) => payload,
  [OFFICER_TIMELINE_FLIP_SORT_ORDER]: (state, action) => null,
  [CHANGE_OFFICER_ID]: (state, action) => null
}, null);
