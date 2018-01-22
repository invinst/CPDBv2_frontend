import { handleActions } from 'redux-actions';
import { keys, isEmpty, omitBy } from 'lodash';

import { SUGGESTION_REQUEST_SUCCESS } from 'actions/search-page';


export default handleActions({
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => (
    keys(omitBy(action.payload, isEmpty))
  )
}, []);
