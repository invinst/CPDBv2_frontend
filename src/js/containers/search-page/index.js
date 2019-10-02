import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SearchPage from 'components/search-page';
import {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  resetNavigation as resetSearchResultNavigation,
  changeSearchQuery,
  saveToRecent,
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


function mapStateToProps(state, ownProps) {
  const {
    contentType, query, isRequesting,
  } = state.searchPage;
  const { children, hide } = ownProps;

  return {
    isRequesting,
    query,
    queryPrefix: queryPrefixSelector(state),
    children,
    hide,
    tags: suggestionTagsSelector(state),
    contentType,
    isEmpty: isEmptySelector(state),
    focusedItem: getFocusedItem(state),
    officerCards: singleCardsSelector(state),
    editModeOn: editModeOnSelector(state, ownProps),
    searchTermsHidden: hiddenSelector(state),
    firstItem: firstItemSelector(state),
    pinboard: getPinboard(state),
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  saveToRecent,
  changeSearchQuery,
  resetSearchResultNavigation,
  requestActivityGrid,
  requestSearchTermCategories,
  resetSearchTermNavigation,
  createPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
