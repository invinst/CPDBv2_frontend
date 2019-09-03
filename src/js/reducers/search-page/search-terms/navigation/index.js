import { combineReducers } from 'redux';

import itemIndex from './item-index';


const navigation = combineReducers({
  itemIndex,
});

export default navigation;
