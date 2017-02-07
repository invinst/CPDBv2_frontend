import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchContent from 'components/search-page/search-content';
import { getSuggestion, selectTag, toggleSearchMode, trackRecentSuggestion } from 'actions/search-page';
import { suggestionGroupsSelector, isEmptySelector, suggestionTagsSelector } from 'selectors/search-page';


function mapStateToProps(state) {
  const { isRequesting, contentType, recentSuggestions } = state.searchPage;

  return {
    tags: suggestionTagsSelector(state),
    suggestionGroups: suggestionGroupsSelector(state),
    isRequesting,
    contentType,
    isEmpty: isEmptySelector(state),
    recentSuggestions
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchContent));
