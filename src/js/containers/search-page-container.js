import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import SearchPage from 'components/search-page';
import {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  resetNavigation as resetSearchResultNavigation,
  changeSearchQuery,
  getSuggestionWithContentType
} from 'actions/search-page';
import {
  requestSearchTermCategories, resetNavigation as resetSearchTermNavigation
} from 'actions/search-page/search-terms';
import { getFocusedItem } from 'selectors/search-page';
import {
  suggestionTagsSelector, searchResultGroupsSelector, isEmptySelector
} from 'selectors/search-page/search-results';
import { hiddenSelector } from 'selectors/search-page/search-terms';
import { cardsSelector } from 'selectors/landing-page/activity-grid';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import editModeOnSelector from 'selectors/edit-mode-on';


function mapStateToProps(state, ownProps) {
  const {
    contentType, recentSuggestions, query, itemsPerColumn
  } = state.searchPage;
  const { children } = ownProps;
  const focusedItem = getFocusedItem(state);

  return {
    itemsPerColumn,
    query,
    children,
    tags: suggestionTagsSelector(state),
    suggestionGroups: searchResultGroupsSelector(state),
    contentType,
    isEmpty: isEmptySelector(state),
    focusedItem: focusedItem,
    recentSuggestions,
    officerCards: cardsSelector(state),
    editModeOn: editModeOnSelector(state, ownProps),
    searchTermsHidden: hiddenSelector(state),
  };
}

const mapDispatchToProps = {
  getSuggestion,
  getSuggestionWithContentType,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  changeSearchQuery,
  resetSearchResultNavigation,
  requestActivityGrid,
  requestSearchTermCategories,
  pushBreadcrumbs,
  resetSearchTermNavigation
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage));
