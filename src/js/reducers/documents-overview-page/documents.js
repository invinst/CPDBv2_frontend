import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';

const mergeResults = (state, action) => {
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
};

export default handleActions({
  [constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS]: mergeResults,
  [constants.DOCUMENT_OVERVIEW_SEARCH_REQUEST_SUCCESS]: mergeResults
}, { data: {}, match: '' });
