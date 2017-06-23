import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchContent from 'components/search-page/search-content';
import {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  move,
  changeSearchQuery
} from 'actions/search-page';
import {
  suggestionGroupsSelector, isEmptySelector, suggestionTagsSelector,
  suggestionColumnsSelector
} from 'selectors/search-page';


function mapStateToProps(state) {
  const { isRequesting, contentType, recentSuggestions, navigation, query } = state.searchPage;

  return {
    navigation,
    query,
    tags: suggestionTagsSelector(state),
    suggestionGroups: suggestionGroupsSelector(state),
    isRequesting,
    contentType,
    isEmpty: isEmptySelector(state),
    suggestionColumns: suggestionColumnsSelector(state),
    recentSuggestions,
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  move,
  changeSearchQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchContent));
