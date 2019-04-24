import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PINBOARD_PAGE_REDIRECT]: (state, action) => ({
    ...state,
    redirect: action.payload,
  }),
  [constants.PINBOARD_PAGE_INITIAL_LOADING]: (state, action) => ({
    ...state,
    initialLoading: action.payload,
  })

}, null);
