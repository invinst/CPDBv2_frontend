import { handleActions } from 'redux-actions';

import { UPDATE_PINBOARD_TIMELINE_IDX } from 'utils/constants';


const timelineIdx = handleActions({
  [UPDATE_PINBOARD_TIMELINE_IDX]: (state, action) => action.payload
}, 0);

export default timelineIdx;
