import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_HOVER_MINIMAP_ITEM, OFFICER_TIMELINE_SELECT_MINIMAP_ITEM, OFFICER_TIMELINE_HOVER_TIMELINE_ITEM
} from 'utils/constants';

export default handleActions({
  [OFFICER_TIMELINE_HOVER_MINIMAP_ITEM]: (state, { payload }) => payload,
  [OFFICER_TIMELINE_SELECT_MINIMAP_ITEM]: (state, { payload }) => payload,
  [OFFICER_TIMELINE_HOVER_TIMELINE_ITEM]: (state, { payload }) => payload
}, null);
