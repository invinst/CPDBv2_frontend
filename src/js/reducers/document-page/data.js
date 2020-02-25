import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { DOCUMENT_REQUEST_SUCCESS, UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [DOCUMENT_REQUEST_SUCCESS]: (state, action) => action.payload,
  [UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
  [LOCATION_CHANGE]: () => ({}),
}, {});
