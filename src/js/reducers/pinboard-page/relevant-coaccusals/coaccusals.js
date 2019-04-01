import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';
import { getPinboardID } from 'utils/location';


export const coaccusalsReducer = (state, action) => {
  const pinboardId = getPinboardID(action.request.url);
  if (pinboardId === state.meta.pinboardId) {
    return {
      meta: { pinboardId },
      items: [...state.items, ...action.payload.results]
    };
  } else {
    return {
      meta: { pinboardId },
      items: action.payload.results
    };
  }
};

export const defaultCoaccusals = { meta: { pinboardId: null }, items: [] };

export default handleActions(
  {
    [constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS]: coaccusalsReducer
  },
  defaultCoaccusals
);
