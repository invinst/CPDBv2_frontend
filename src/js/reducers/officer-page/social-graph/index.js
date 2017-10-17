import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import nodes from './nodes';
import links from './links';
import yearRange from './year-range';


export default combineReducers({
  isRequesting,
  yearRange,
  nodes,
  links
});
