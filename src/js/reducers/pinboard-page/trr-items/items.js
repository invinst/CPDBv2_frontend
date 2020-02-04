import { handleActions } from 'redux-actions';
import * as _ from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
  COMPLETE_REMOVE_ITEM_FROM_PINBOARD,
  ORDER_PINBOARD,
} from 'utils/constants';

export default handleActions({
  [PINBOARD_TRRS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [COMPLETE_REMOVE_ITEM_FROM_PINBOARD]: (state, action) => {
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
  [LOCATION_CHANGE]: (state, action) => [],
}, []);
