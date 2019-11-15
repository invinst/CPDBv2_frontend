import { handleActions } from 'redux-actions';

import { PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS } from 'utils/constants';

const CACHE_CAP = 5;
export default handleActions({
  [PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS]: (state, action) => {
    const newData = { ...action.payload, 'pinboard_id': action.request.params['pinboard_id'] };
    const allData = [...state, newData];
    if (allData.length > CACHE_CAP)
      return allData.slice(allData.length - CACHE_CAP);
    return allData;
  },
}, []);
