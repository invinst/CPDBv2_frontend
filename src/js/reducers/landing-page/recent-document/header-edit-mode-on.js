import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';
import { editModeOn } from 'utils/edit-path';


export default handleActions({
  [constants.TURN_ON_CAROUSEL_DOCUMENT_HEADER_EDIT_MODE]: () => true,
  [constants.TURN_OFF_CAROUSEL_DOCUMENT_HEADER_EDIT_MODE]: () => false,
  [constants.LOCATION_CHANGE]: (state, action) => {
    if (state && !editModeOn(action.payload.pathname)) {
      return false;
    }
    return state;
  }
}, false);
