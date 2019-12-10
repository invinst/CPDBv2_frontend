import { combineReducers } from 'redux';

import suggestionGroups from './suggestion-groups';
import isRequesting from './is-requesting';
import contentType from './content-type';
import tags from './tags';
import recentSuggestions from './recent-suggestions';
import navigation from './navigation';
import cancelPathname from './cancle-pathname';
import query from './query';
import searchTerms from './search-terms';
import pagination from './pagination';
import recentSuggestionsRequested from './recent-suggestions-requested';


const searchPage = combineReducers({
  suggestionGroups,
  isRequesting,
  contentType,
  tags,
  recentSuggestions,
  navigation,
  cancelPathname,
  query,
  searchTerms,
  pagination,
  recentSuggestionsRequested,
});

export default searchPage;
