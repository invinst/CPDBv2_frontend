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
} from 'actions/search-page';
import { createPinboard } from 'actions/pinboard';
import {
  requestSearchTermCategories, resetNavigation as resetSearchTermNavigation,
} from 'actions/search-page/search-terms';
import { getFocusedItem } from 'selectors/search-page';
import {
  suggestionTagsSelector, isEmptySelector, firstItemSelector, queryPrefixSelector,
} from 'selectors/search-page/search-results/suggestion-groups';
import { hiddenSelector } from 'selectors/search-page/search-terms';
import { singleCardsSelector } from 'selectors/landing-page/activity-grid';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import editModeOnSelector from 'selectors/edit-mode-on';
import { getPinboard } from 'selectors/pinboard-page/pinboard';
import { getToast } from 'selectors/toast';


function mapStateToProps(state, ownProps) {
  const {
    contentType, query, isRequesting,
  } = state.searchPage;
  const { children } = ownProps;
  const focusedItem = getFocusedItem(state);

  return {
    isRequesting,
    query,
    queryPrefix: queryPrefixSelector(state),
    children,
    tags: suggestionTagsSelector(state),
    contentType,
    isEmpty: isEmptySelector(state),
    focusedItem: focusedItem,
    officerCards: singleCardsSelector(state),
    editModeOn: editModeOnSelector(state, ownProps),
    searchTermsHidden: hiddenSelector(state),
    firstItem: firstItemSelector(state),
    pinboard: getPinboard(state),
    toast: getToast(state),
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  trackRecentSuggestion,
  changeSearchQuery,
  resetSearchResultNavigation,
  requestActivityGrid,
  requestSearchTermCategories,
  pushBreadcrumbs,
  resetSearchTermNavigation,
  createPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
