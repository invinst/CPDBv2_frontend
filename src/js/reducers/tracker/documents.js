import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.TRACKER_DOCUMENTS_REQUEST_SUCCESS]:
    (state, action) => {
      let docsDict = {};
      for (let i = 0; i < action.payload.results.length; i++) {
        const doc = action.payload.results[i];
        docsDict[doc.id] = doc;
      }

      return { ...state, ...docsDict };
    },
  [constants.TRACKER_DOCUMENTS_TOGGLE_SHOW_REQUEST_SUCCESS]:
    (state, action) => {
      const id = parseInt(action.request.url.replace(/.+attachments\/(\d+).*/, '$1'));
      state[id].show = action.payload.show;

      return { ...state };
    }
}, {});
