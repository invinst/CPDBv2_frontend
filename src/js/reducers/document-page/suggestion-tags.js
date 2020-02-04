import { handleActions } from 'redux-actions';

import { FETCH_DOCUMENT_SUGGESTION_TAGS_SUCCESS } from 'utils/constants';


export default handleActions({
  [FETCH_DOCUMENT_SUGGESTION_TAGS_SUCCESS]: (state, action) => action.payload,
}, []);
