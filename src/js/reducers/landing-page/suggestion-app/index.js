import { combineReducers } from 'redux';

import suggestionGroups from './suggestion-groups';
import isRequesting from './is-requesting';


const suggestionApp = combineReducers({
  suggestionGroups,
  isRequesting
});

export default suggestionApp;
