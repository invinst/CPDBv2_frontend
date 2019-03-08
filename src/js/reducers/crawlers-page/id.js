import { handleActions } from 'redux-actions';

import { OPEN_LOG_FILE_MODAL } from 'actions/generic-modal';


const id = handleActions({
  [OPEN_LOG_FILE_MODAL]: (state, action) => action.payload
}, '');

export default id;
