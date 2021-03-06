import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SearchPage from 'components/search-page';
import {
  getSuggestion,
  selectTag,
  toggleSearchMode,
  resetNavigation as resetSearchResultNavigation,
  changeSearchQuery,
  saveToRecent,
} from 'actions/search-page';
import { createNewEmptyPinboard } from 'actions/pinboard';
import {
  requestSearchTermCategories, resetNavigation as resetSearchTermNavigation,
} from 'actions/search-page/search-terms';
import { getCancelPathname, getFocusedItem } from 'selectors/search-page';
import {
  suggestionTagsSelector, firstItemSelector, queryPrefixSelector,
} from 'selectors/search-page/search-results/suggestion-groups';
import { hiddenSelector } from 'selectors/search-page/search-terms';
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
    focusedItem: getFocusedItem(state),
    editModeOn: editModeOnSelector(state, ownProps),
    searchTermsHidden: hiddenSelector(state),
    firstItem: firstItemSelector(state),
    pinboard: getPinboard(state),
    cancelPathname: getCancelPathname(state),
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
  createNewEmptyPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
