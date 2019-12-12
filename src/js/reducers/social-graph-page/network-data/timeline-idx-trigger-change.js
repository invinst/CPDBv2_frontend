import { handleActions } from 'redux-actions';

import { UPDATE_SOCIAL_GRAPH_TIMELINE_IDX } from 'utils/constants';


const timelineIdxTriggerChange = handleActions({
  [UPDATE_SOCIAL_GRAPH_TIMELINE_IDX]: (state, action) => (state + 1) % 2,
}, 0);

export default timelineIdxTriggerChange;
