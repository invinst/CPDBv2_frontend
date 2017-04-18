import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => {
    return [...state, ...action.payload.results];
  }
}, []);
