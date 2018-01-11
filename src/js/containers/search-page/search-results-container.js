import { connect } from 'react-redux';

import SearchResults from 'components/search-page/search-results';

import {
  getSuggestion,
  trackRecentSuggestion,
  resetNavigation
} from 'actions/search-page';
import { setAliasAdminPageContent } from 'actions/inline-alias-admin-page';
import {
  isEmptySelector,
  previewPaneInfoSelector,
  searchResultGroupsSelector,
  focusedItemSelector
} from 'selectors/search-page';


function mapStateToProps(state, ownProps) {
  const { onLoadMore, aliasEditModeOn, editModeOn } = ownProps;
  const { isRequesting, navigation, query, contentType } = state.searchPage;

  return {
    navigation,
    onLoadMore,
    aliasEditModeOn,
    isEmpty: isEmptySelector(state),
    searchText: query,
    contentType,
    editModeOn,
    suggestionGroups: searchResultGroupsSelector(state),
    isRequesting,
    previewPaneInfo: previewPaneInfoSelector(state),
    focusedItem: focusedItemSelector(state)
  };
}

const mapDispatchToProps = {
  getSuggestion,
  resetNavigation,
  setAliasAdminPageContent,
  suggestionClick: trackRecentSuggestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
