import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import SearchPage from 'components/search-page';
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
  toggleSearchTerms, requestSearchTermCategories
} from 'actions/search-page/search-terms';
import {
  chunkedSuggestionGroupsSelector, isEmptySelector, suggestionTagsSelector,
  suggestionColumnsSelector, focusedSuggestionSelector, isShowingSingleContentTypeSelector
} from 'selectors/search-page';
import { hiddenSelector } from 'selectors/search-page/search-terms';
import { cardsSelector } from 'selectors/landing-page/activity-grid';
import { requestActivityGrid } from 'actions/landing-page/activity-grid';
import editModeOnSelector from 'selectors/edit-mode-on';


function mapStateToProps(state, ownProps) {
  const {
    isRequesting, contentType, recentSuggestions, navigation, query, itemsPerColumn
  } = state.searchPage;
  const { children } = ownProps;

  return {
    navigation,
    itemsPerColumn,
    query,
    children,
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
    editModeOn: editModeOnSelector(state, ownProps),
    searchTermsHidden: hiddenSelector(state),
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
  requestActivityGrid,
  toggleSearchTerms,
  requestSearchTermCategories,
  pushBreadcrumbs,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage));
