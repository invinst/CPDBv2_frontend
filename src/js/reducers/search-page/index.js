import { combineReducers } from 'redux';

import suggestionGroups from './suggestion-groups';
import isRequesting from './is-requesting';
import contentType from './content-type';
import tags from './tags';


const searchPage = combineReducers({
  suggestionGroups,
  isRequesting,
  contentType,
  tags
});

export default searchPage;
