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
import { getfocusedItem } from 'selectors/search-page/navigation';
import { focusedSearchTermItemSelector } from 'selectors/search-page/search-terms';
import {
  suggestionTagsSelector, searchResultGroupsSelector, isEmptySelector
} from 'selectors/search-page/search-results';
import { isShowingSingleContentTypeSelector } from 'selectors/search-page/base';
import { hiddenSelector } from 'selectors/search-page/search-terms';
import { cardsSelector } from 'selectors/landing-page/activity-grid';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import editModeOnSelector from 'selectors/edit-mode-on';


function mapStateToProps(state, ownProps) {
  const {
    contentType, recentSuggestions, query, itemsPerColumn
  } = state.searchPage;
  const { children } = ownProps;
  const focusedItem = getfocusedItem(state);

  return {
    itemsPerColumn,
    query,
    children,
    tags: suggestionTagsSelector(state),
    suggestionGroups: searchResultGroupsSelector(state),
    contentType,
    isEmpty: isEmptySelector(state),
    focusedItem: focusedItem,
    focusedSearchTermItem: focusedSearchTermItemSelector(state),
    isShowingSingleContentType: isShowingSingleContentTypeSelector(state),
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
