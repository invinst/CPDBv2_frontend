import { connect } from 'react-redux';

import SearchResults from 'components/search-page/search-results';
import {
  resetNavigation,
  getSuggestionWithContentType,
  move,
  setSearchNavigation,
} from 'actions/search-page';
import { setAliasAdminPageContent } from 'actions/inline-alias-admin-page';
import {
  isEmptySelector,
  searchResultGroupsSelector,
  hasMoreSelector,
  nextParamsSelector,
  isShowingSingleContentTypeSelector,
} from 'selectors/search-page/search-results/suggestion-groups';
import {
  previewPaneInfoSelector,
  totalItemCountSelector,
} from 'selectors/search-page/search-results/navigation';
import { getFocusedItem } from 'selectors/search-page';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';
import { pinboardUrlSelector } from 'selectors/pinboard-page/pinboard';


function mapStateToProps(state, ownProps) {
  const {
    onLoadMore,
    aliasEditModeOn,
    editModeOn,
    onSelect,
    contentType,
  } = ownProps;
  const { isRequesting, navigation, query } = state.searchPage;

  return {
    navigation,
    onLoadMore,
    onSelect,
    contentType,
    aliasEditModeOn,
    isEmpty: isEmptySelector(state),
    searchText: query,
    editModeOn,
    suggestionGroups: searchResultGroupsSelector(state),
    isRequesting,
    previewPaneInfo: previewPaneInfoSelector(state),
    focusedItem: getFocusedItem(state),
    hasMore: hasMoreSelector(state),
    nextParams: nextParamsSelector(state),
    singleContent: isShowingSingleContentTypeSelector(state),
    totalItemCount: totalItemCountSelector(state),
    pinboardUrl: pinboardUrlSelector(state),
  };
}

const mapDispatchToProps = {
  resetNavigation,
  setAliasAdminPageContent,
  getSuggestionWithContentType,
  move,
  setSearchNavigation,
  addOrRemoveItemInPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
