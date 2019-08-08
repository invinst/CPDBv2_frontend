import { LOCATION_CHANGE } from 'utils/constants';
import { handleActions } from 'redux-actions';
import { editModeOn } from 'utils/edit-path';

export const handleCMSEditModeActions = (EDIT_MODE, EDIT_TYPES) => {
  const defaultState = {};
  EDIT_TYPES.enums.forEach(typeEnum => defaultState[typeEnum.key] = false);

  return handleActions({
    [EDIT_MODE]: (state, action) => {
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
};
