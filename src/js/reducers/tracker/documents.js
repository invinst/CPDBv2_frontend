import { handleActions } from 'redux-actions';
import { unionBy } from 'lodash';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.TRACKER_DOCUMENTS_REQUEST_FAILURE]: (state, action) => state,
  [constants.TRACKER_DOCUMENTS_REQUEST_START]: (state, action) => state,
  [constants.TRACKER_DOCUMENTS_REQUEST_SUCCESS]:
    (state, action) => unionBy(state, action.payload.results, 'id'),
}, []);
