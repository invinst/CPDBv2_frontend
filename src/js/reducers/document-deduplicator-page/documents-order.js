import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS]:
    (state, action) => {
      const docIds = _.map(action.payload.results, (doc) => doc.id);
      return state.concat(docIds);
    }
}, []);
