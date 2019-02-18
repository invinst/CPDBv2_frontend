import { handleActions } from 'redux-actions';
import { map } from 'lodash';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS]:
    (state, action) => {
      const docs = map(action.payload.results, (doc) => doc.id);
      return state.concat(docs);
    }
}, []);
