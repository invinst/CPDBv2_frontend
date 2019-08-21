import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const recentDocument = handleActions({
  [constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS]: (state, action) => (action.payload),
}, []);

export default recentDocument;
