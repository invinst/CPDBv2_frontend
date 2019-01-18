import { handleActions } from 'redux-actions';

import {
  CHANGE_OFFICER_ID,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_FAILURE,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS
} from 'utils/constants';


export default handleActions({
  [CHANGE_OFFICER_ID]: (state, action) => false,
  [OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START]: (state, action) => true,
  [OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS]: (state, action) => false,
  [OFFICER_FETCH_ZIP_FILE_URL_REQUEST_FAILURE]: (state, action) => false,
}, '');
