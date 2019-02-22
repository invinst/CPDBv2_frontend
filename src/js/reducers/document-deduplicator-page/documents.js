import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS]:
    (state, action) => {
      const newRows = {};
      for (let row of action.payload.results) {
        newRows[row.id] = row;
      }

      return { ...state, ...newRows };
    },
  [constants.DOCUMENT_VISIBILITY_TOGGLE_REQUEST_SUCCESS]:
    (state, action) => {
      const id = parseInt(action.request.url.replace(/.+attachments\/(\d+).*/, '$1'));
      if (id in state) {
        state[id]['show'] = action.payload.show;
      }
      return { ...state };
    }
}, {});
