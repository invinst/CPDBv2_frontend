import { connect } from 'react-redux';

import SearchResults from 'components/search-page/search-results';

import {
  getSuggestion,
  trackRecentSuggestion,
  resetNavigation
} from 'actions/search-page';
import {
  chunkedSuggestionGroupsSelector, isEmptySelector
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
    suggestionGroups: chunkedSuggestionGroupsSelector(state),
    isRequesting,
  };
}

const mapDispatchToProps = {
  getSuggestion,
  resetNavigation,
  suggestionClick: trackRecentSuggestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
