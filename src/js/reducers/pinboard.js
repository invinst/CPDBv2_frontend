import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => ({
    ...action.payload,
    ownedByCurrentUser: true
  }),
  [constants.PINBOARD_UPDATE_REQUEST_SUCCESS]: (state, action) => ({
    ...action.payload,
    ownedByCurrentUser: state.ownedByCurrentUser
  }),
  [constants.PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...action.payload,
    ownedByCurrentUser: false
  })
}, null);
