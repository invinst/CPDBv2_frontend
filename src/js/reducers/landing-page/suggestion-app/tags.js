import { handleActions } from 'redux-actions';
import { keys, has, isEmpty, omitBy } from 'lodash';

import { SUGGESTION_REQUEST_SUCCESS } from 'actions/landing-page/suggestion';


export default handleActions({
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => (
    !has(action, 'request.params.contentType')
    || !action.request.params.contentType ?
      keys(omitBy(action.payload, isEmpty)) : state
  )
}, []);
