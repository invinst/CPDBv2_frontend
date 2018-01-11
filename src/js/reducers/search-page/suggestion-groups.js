import { handleActions } from 'redux-actions';
import { unionBy } from 'lodash';

import {
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE
} from 'actions/search-page';
import * as constants from 'utils/constants';


export default handleActions({
  [SUGGESTION_REQUEST_START]: (state, action) => ({ meta: {} }),
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => ({ ...action.payload, meta: { url: action.request.url } }),
  [SUGGESTION_REQUEST_FAILURE]: (state, action) => ({ meta: {} }),
  [constants.SUGGESTION_SINGLE_REQUEST_START]: (state, action) => (state),
  [constants.SUGGESTION_SINGLE_REQUEST_SUCCESS]: (state, action) => {
    const { contentType } = action.request.params;
    return {
      [contentType]: action.request.url === state.meta.url ?
        unionBy(state[contentType], action.payload.results, 'id') :
        action.payload.results,
      meta: { url: action.request.url }
    };
  },
  [constants.SUGGESTION_SINGLE_REQUEST_FAILURE]: (state, action) => ({ meta: {} })
}, { meta: {} });
