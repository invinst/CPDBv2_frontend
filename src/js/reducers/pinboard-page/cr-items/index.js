import { combineReducers } from 'redux';

import items from './items';
import requesting from './requesting';


export default combineReducers({
  items,
  requesting,
});
