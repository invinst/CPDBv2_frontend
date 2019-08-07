import { combineReducers } from 'redux';

import items from './items';
import removingItems from './removing-items';
import requesting from './requesting';


export default combineReducers({
  items,
  removingItems,
  requesting,
});
