import { combineReducers } from 'redux';

import suggestions from './suggestions';
import isRequesting from './is-requesting';


const suggestionApp = combineReducers({
  suggestions,
  isRequesting
});

export default suggestionApp;
