import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => ({ data: {}, match: '' }),
  [constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS]: (state, action) => {
    const matchVal = _.get(action.request.params, 'match', '');
    const newRows = {};
    for (let row of action.payload.results) {
      newRows[row.id] = row;
    }

    if (state.match === matchVal) {
      return { data: { ...state.data, ...newRows }, match: matchVal };
    } else {
      return {
        data: newRows,
        match: matchVal
      };
    }
  }
}, { data: {}, match: '' });
