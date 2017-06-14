import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchContent from 'components/search-page/search-content';
import { getSuggestion, selectTag, toggleSearchMode, trackRecentSuggestion, move } from 'actions/search-page';
import {
  suggestionGroupsSelector, isEmptySelector, suggestionTagsSelector,
  suggestionColumnsSelector
} from 'selectors/search-page';


function mapStateToProps(state) {
  const { isRequesting, contentType, recentSuggestions, navigation } = state.searchPage;

  return {
    navigation,
    tags: suggestionTagsSelector(state),
    suggestionGroups: suggestionGroupsSelector(state),
    isRequesting,
    contentType,
    isEmpty: isEmptySelector(state),
    suggestionColumns: suggestionColumnsSelector(state),
    recentSuggestions
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  move
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchContent));
