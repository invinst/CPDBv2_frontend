import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import minimap from './minimap';


export default combineReducers({
  isRequesting,
  minimap
});
