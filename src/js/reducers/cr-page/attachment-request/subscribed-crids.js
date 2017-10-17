import { handleActions } from 'redux-actions';

import { CR_REQUEST_DOC_SUCCESS } from 'utils/constants';


const subscribedCRIDs = handleActions({
  [CR_REQUEST_DOC_SUCCESS]: (state, { payload }) => ({ ...state, [payload.crid]: true }),
}, {});

export default subscribedCRIDs;
