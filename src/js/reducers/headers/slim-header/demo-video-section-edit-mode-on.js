import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { TURN_ON_DEMO_VIDEO_EDIT_MODE, TURN_OFF_DEMO_VIDEO_EDIT_MODE } from 'utils/constants';
import { editModeOn } from 'utils/edit-path';


export default handleActions({
  [TURN_ON_DEMO_VIDEO_EDIT_MODE]: () => true,
  [TURN_OFF_DEMO_VIDEO_EDIT_MODE]: () => false,
  [LOCATION_CHANGE]: (state, action) => {
    if (state && !editModeOn(action.payload.location.pathname)) {
      return false;
    }
    return state;
  },
}, false);
