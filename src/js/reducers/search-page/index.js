import { combineReducers } from 'redux';

import suggestionGroups from './suggestion-groups';
import isRequesting from './is-requesting';
import contentType from './content-type';
import tags from './tags';
import recentSuggestions from './recent-suggestions';
import navigation from './navigation';
import query from './query';
import itemsPerColumn from './items-per-column';


const searchPage = combineReducers({
  suggestionGroups,
  isRequesting,
  contentType,
  tags,
  recentSuggestions,
  navigation,
  query,
  itemsPerColumn
});

export default searchPage;
