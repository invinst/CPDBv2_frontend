import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchPage from 'components/search-page';
import {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  move,
  resetNavigation,
  changeSearchQuery,
  getSuggestionWithContentType
} from 'actions/search-page';
import {
  toggleSearchTerms, requestSearchTermCategories
} from 'actions/search-page/search-terms';
import {
  isEmptySelector, suggestionTagsSelector, totalItemCountSelector,
  focusedItemSelector, isShowingSingleContentTypeSelector,
  searchResultGroupsSelector
} from 'selectors/search-page';
import { hiddenSelector } from 'selectors/search-page/search-terms';
import { cardsSelector } from 'selectors/landing-page/activity-grid';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import editModeOnSelector from 'selectors/edit-mode-on';


function mapStateToProps(state, ownProps) {
  const {
    isRequesting, contentType, recentSuggestions, query, itemsPerColumn
  } = state.searchPage;
  const { children } = ownProps;

  return {
    itemsPerColumn,
    query,
    children,
    tags: suggestionTagsSelector(state),
    suggestionGroups: searchResultGroupsSelector(state),
    isRequesting,
    contentType,
    isEmpty: isEmptySelector(state),
    focusedItem: focusedItemSelector(state),
    isShowingSingleContentType: isShowingSingleContentTypeSelector(state),
    recentSuggestions,
    officerCards: cardsSelector(state),
    editModeOn: editModeOnSelector(state, ownProps),
    searchTermsHidden: hiddenSelector(state),
    totalItemCount: totalItemCountSelector(state)
  };
}

const mapDispatchToProps = {
  getSuggestion,
  getSuggestionWithContentType,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  move,
  changeSearchQuery,
  resetNavigation,
  requestActivityGrid,
  toggleSearchTerms,
  requestSearchTermCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage));
