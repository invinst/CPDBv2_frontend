import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const recentDocument = handleActions({
  [constants.RECENT_DOCUMENT_REQUEST_SUCCESS]: (state, action) => (action.payload),
}, []);

export default recentDocument;
