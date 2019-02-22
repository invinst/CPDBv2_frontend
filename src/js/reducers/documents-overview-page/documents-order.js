import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';

const mergeOrder = (state, action) => {
  const matchVal = _.get(action.request.params, 'match', '');
  const docIds = _.map(action.payload.results, (doc) => doc.id);

  if (state.match === matchVal) {
    return {
      data: state.data.concat(docIds),
      match: matchVal
    };
  } else {
    return {
      data: docIds,
      match: matchVal
    };
  }
};

export default handleActions({
  [constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS]: mergeOrder,
  [constants.DOCUMENT_OVERVIEW_SEARCH_REQUEST_SUCCESS]: mergeOrder
}, { data: [], match: '' });
