import { handleActions } from 'redux-actions';

import { VIDEO_INFO_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [VIDEO_INFO_REQUEST_SUCCESS]: (state, action) => action.payload,
}, []);
