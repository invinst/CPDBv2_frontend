import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import officers from './officers';


export default combineReducers({
  isRequesting,
  officers
});
