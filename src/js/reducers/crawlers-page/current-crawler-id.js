import { handleActions } from 'redux-actions';

import { OPEN_LOG_FILE_MODAL } from 'actions/generic-modal';


const currentCrawlerId = handleActions({
  [OPEN_LOG_FILE_MODAL]: (state, action) => action.payload,
}, null);

export default currentCrawlerId;
