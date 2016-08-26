import { combineReducers } from 'redux';

import stories from './stories';
import isRequesting from './is-requesting';
import isLoadingMore from './is-loading-more';


export default combineReducers({
  stories,
  isRequesting,
  isLoadingMore
});
