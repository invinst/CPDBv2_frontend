import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS]:
    (state, action) => {
      let docsDict = {};
      for (let i = 0; i < action.payload.results.length; i++) {
        const doc = action.payload.results[i];
        docsDict[doc.id] = doc;
      }

      return { ...state, ...docsDict };
    }
}, {});
