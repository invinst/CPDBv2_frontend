import { combineReducers } from 'redux';

import scrollTo from './scroll-to';
import itemIndex from './item-index';


const navigation = combineReducers({
  scrollTo,
  itemIndex
});

export default navigation;
