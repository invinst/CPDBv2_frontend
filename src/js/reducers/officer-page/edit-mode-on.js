import {
  OFFICER_EDIT_MODE,
  OFFICER_EDIT_TYPES,
  LOCATION_CHANGE,
} from 'utils/constants';
import { handleActions } from 'redux-actions';
import { editModeOn } from 'utils/edit-path';


const defaultState = {
  [OFFICER_EDIT_TYPES.TRIANGLE]: false,
  [OFFICER_EDIT_TYPES.SCALE]: false,
  [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
};

export default handleActions({
  [OFFICER_EDIT_MODE]: (state, action) => {
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
