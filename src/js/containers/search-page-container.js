import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchContent from 'components/search-page/search-content';
import {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  move,
  resetNavigation,
  changeSearchQuery
} from 'actions/search-page';
import {
  chunkedSuggestionGroupsSelector, isEmptySelector, suggestionTagsSelector,
  suggestionColumnsSelector, focusedSuggestionSelector, isShowingSingleContentTypeSelector
} from 'selectors/search-page';
import { cardsSelector } from 'selectors/landing-page/activity-grid';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import editModeOnSelector from 'selectors/edit-mode-on';


function mapStateToProps(state, ownProps) {
  const { isRequesting, contentType, recentSuggestions, navigation, query, itemsPerColumn } = state.searchPage;

  return {
    navigation,
    itemsPerColumn,
    query,
    tags: suggestionTagsSelector(state),
    suggestionGroups: chunkedSuggestionGroupsSelector(state),
    isRequesting,
    contentType,
    isEmpty: isEmptySelector(state),
    suggestionColumns: suggestionColumnsSelector(state),
    focusedSuggestion: focusedSuggestionSelector(state),
    isShowingSingleContentType: isShowingSingleContentTypeSelector(state),
    recentSuggestions,
    officerCards: cardsSelector(state),
    editModeOn: editModeOnSelector(state, ownProps)
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  move,
  changeSearchQuery,
  resetNavigation,
  requestActivityGrid
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchContent));
