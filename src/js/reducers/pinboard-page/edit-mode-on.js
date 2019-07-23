import {
  PINBOARD_EDIT_MODE,
  PINBOARD_EDIT_TYPES,
  LOCATION_CHANGE
} from 'utils/constants';
import { handleActions } from 'redux-actions';
import { editModeOn } from 'utils/edit-path';


const defaultState = {
  [PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE]: false,
  [PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION]: false,
};

export default handleActions({
  [PINBOARD_EDIT_MODE]: (state, action) => {
    const { editType, mode } = action.payload;
    return { ...state, [editType]: mode };
  },
  [LOCATION_CHANGE]: (state, action) => {
    if (!editModeOn(action.payload.pathname)) {
      return defaultState;
    }
    return state;
  }
}, defaultState);
