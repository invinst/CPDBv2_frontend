import { handleActions } from 'redux-actions';

import {
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
  CLEAR_PINBOARD_STATIC_SOCIAL_GRAPH_CACHE,
} from 'utils/constants';

const CACHE_CAP = 10;
export default handleActions({
  [PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS]: (state, action) => {
    const newData = { ...action.payload, 'pinboard_id': action.request.params['pinboard_id'] };
    const allData = [...state, newData];
    if (allData.length > CACHE_CAP)
      return allData.slice(allData.length - CACHE_CAP);
    return allData;
  },
  [CLEAR_PINBOARD_STATIC_SOCIAL_GRAPH_CACHE]: (state, action) => [],
}, []);
