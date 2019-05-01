import { handleActions } from 'redux-actions';
import { get } from 'lodash';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    ownedByCurrentUser: true
  }),
  [constants.PINBOARD_UPDATE_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    ownedByCurrentUser: state.ownedByCurrentUser
  }),
  [constants.PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    ownedByCurrentUser:
      get(state, 'ownedByCurrentUser', false) &&
      get(state, 'id', null) === action.payload.id,
  }),
}, null);
