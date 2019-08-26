import {
  TRR_EDIT_MODE,
  TRR_EDIT_TYPES,
  LOCATION_CHANGE,
} from 'utils/constants';
import { handleActions } from 'redux-actions';
import { editModeOn } from 'utils/edit-path';


const defaultState = {
  [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
  [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
};

export default handleActions({
  [TRR_EDIT_MODE]: (state, action) => {
    const { editType, mode } = action.payload;
    return { ...state, [editType]: mode };
  },
  [LOCATION_CHANGE]: (state, action) => {
    if (!editModeOn(action.payload.pathname)) {
      return defaultState;
    }
    return state;
  },
}, defaultState);
