import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS]:
    (state, action) => {
      const cridVal = _.get(action.request.params, 'crid', '');
      const newRows = {};
      for (let row of action.payload.results) {
        newRows[row.id] = row;
      }

      if (state.crid === cridVal) {
        return {
          data: { ...state.data, ...newRows },
          crid: cridVal,
        };
      }
      return {
        data: newRows,
        crid: cridVal,
      };
    },
  [constants.DOCUMENT_VISIBILITY_TOGGLE_REQUEST_SUCCESS]:
    (state, action) => {
      const id = parseInt(action.request.url.replace(/.+attachments\/(\d+).*/, '$1'));
      if (id in state.data) {
        state.data[id]['show'] = action.payload.show;
      }
      return {
        data: { ...state.data },
        crid: state.crid,
      };
    },
}, { data: {}, crid: '' });
