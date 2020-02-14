import { handleActions } from 'redux-actions';
import * as _ from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  COMPLETE_REMOVE_ITEM_FROM_PINBOARD,
} from 'utils/constants';


export default handleActions({
  [PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [ADD_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    if (action.payload.type === 'CR') {
      const item = action.payload;
      if (_.every(currentItems, currentItem => currentItem.crid !== item.id)) {
        return currentItems.concat(item.rawData);
      }
    }
    return currentItems;
  },
  [COMPLETE_REMOVE_ITEM_FROM_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'CR') {
      return _.reject(currentItems, { crid: id });
    }
    return currentItems;
  },
  [ORDER_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { ids, type } = action.payload;

    if (type === 'CR') {
      return _.sortBy(currentItems, item => _.findIndex(ids, id => id === item.crid));
    }
    return currentItems;
  },
  [LOCATION_CHANGE]: (state, action) => [],
}, []);
