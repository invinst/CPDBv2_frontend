import { handleActions } from 'redux-actions';
import * as _ from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';

import * as constants from 'utils/constants';

export default handleActions({
  [LOCATION_CHANGE]: (state, action) => ({ data: [], match: '' }),
  [constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS]: (state, action) => {
    const matchVal = _.get(action.request.params, 'match', '');
    const docIds = _.map(action.payload.results, (doc) => doc.id);

    if (state.match === matchVal) {
      return {
        data: state.data.concat(docIds),
        match: matchVal,
      };
    } else {
      return {
        data: docIds,
        match: matchVal,
      };
    }
  },
}, { data: [], match: '' });
