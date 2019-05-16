import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import {
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
} from 'utils/constants';

export default handleActions({
  [PINBOARD_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [REMOVE_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'TRR') {
      return _.reject(currentItems, { id: _.parseInt(id) });
    }
    return currentItems;
  },
  [ORDER_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { ids, type } = action.payload;

    if (type === 'TRR') {
      return _.sortBy(currentItems, item => _.findIndex(ids, id => id === item.id.toString()));
    }
    return currentItems;
  },
}, []);
