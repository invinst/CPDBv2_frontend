import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';


export default handleActions({
  [constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS]:
    (state, action) => {
      const cridVal = _.get(action.request.params, 'crid', '');
      const docIds = _.map(action.payload.results, (doc) => doc.id);

      if (state.crid === cridVal) {
        return {
          data: state.data.concat(docIds),
          crid: cridVal,
        };
      }

      return {
        data: docIds,
        crid: cridVal,
      };
    },
}, { data: [], crid: '' });
