import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const relatedComlaints = handleActions({
  [constants.RELATED_COMPLAINTS_BY_OFFICER_REQUEST_SUCCESS]: (state, action) => (action.payload.results)
}, []);

export default relatedComlaints;
