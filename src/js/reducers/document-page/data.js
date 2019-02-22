import { handleActions } from 'redux-actions';

import { DOCUMENT_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [DOCUMENT_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
}, {});
