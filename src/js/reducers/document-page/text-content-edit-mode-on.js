import { handleActions } from 'redux-actions';

import {
  TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE,
  TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE,
  LOCATION_CHANGE,
} from 'utils/constants';
import { editModeOn } from 'utils/edit-path';


export default handleActions({
  [TURN_ON_DOCUMENT_TEXT_CONTENT_EDIT_MODE]: () => true,
  [TURN_OFF_DOCUMENT_TEXT_CONTENT_EDIT_MODE]: () => false,
  [LOCATION_CHANGE]: (state, action) => {
    if (state && !editModeOn(action.payload.pathname)) {
      return false;
    }
    return state;
  }
}, false);
