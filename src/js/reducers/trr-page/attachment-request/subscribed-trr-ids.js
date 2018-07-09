import { handleActions } from 'redux-actions';

import { TRR_REQUEST_DOC_REQUEST_SUCCESS } from 'utils/constants';


const subscribedTRRIds = handleActions({
  [TRR_REQUEST_DOC_REQUEST_SUCCESS]: (state, { payload }) => ({ ...state, [payload['trr_id']]: true }),
}, {});

export default subscribedTRRIds;
