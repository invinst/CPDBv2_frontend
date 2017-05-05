import { handleActions } from 'redux-actions';

import { OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [OFFICER_TIMELINE_MINIMAP_REQUEST_SUCCESS]: (state, action) => action.payload
}, []);
