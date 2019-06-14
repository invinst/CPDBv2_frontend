import { handleActions } from 'redux-actions';

import {
  UPDATE_SOCIAL_GRAPH_TIMELINE_IDX,
  UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB,
} from 'utils/constants';


const timelineIdx = handleActions({
  [UPDATE_SOCIAL_GRAPH_TIMELINE_IDX]: (state, action) => action.payload,
  [UPDATE_SOCIAL_GRAPH_TIMELINE_IDX_FROM_TIMELINE_TAB]: (state, action) => action.payload
}, 0);

export default timelineIdx;
