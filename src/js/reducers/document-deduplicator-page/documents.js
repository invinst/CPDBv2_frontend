import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS]:
    (state, action) => {
      return action.payload.results;
    },
  [constants.DOCUMENT_VISIBILITY_TOGGLE_REQUEST_SUCCESS]:
    (state, action) => {
      const id = parseInt(action.request.url.replace(/.+attachments\/(\d+).*/, '$1'));
      _.each(state, doc => {
        if (doc.id === id) {
          doc.show = action.payload.show;
        }
      });
      return state.slice();
    }
}, []);
