import { handleActions } from 'redux-actions';

import {
  CHANGE_OFFICER_ID,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS
} from 'utils/constants';


export default handleActions({
  [CHANGE_OFFICER_ID]: (state, action) => ({ withDocs: '', withoutDocs: '' }),
  [OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START]: (state, action) => ({ ...state, withoutDocs: '' }),
  [OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS]: (state, action) => ({ ...state, withoutDocs: action.payload }),
  [OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START]: (state, action) => ({ ...state, withDocs: '' }),
  [OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS]: (state, action) => ({ ...state, withDocs: action.payload }),
}, { withDocs: false, withoutDocs: false });
