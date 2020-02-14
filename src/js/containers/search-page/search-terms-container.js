import { connect } from 'react-redux';

import SearchTerms from 'components/search-page/search-terms';
import { move, resetNavigation } from 'actions/search-page/search-terms';
import {
  focusedSearchTermItemSelector,
  totalItemCountSelector,
  navigationKeySelector,
} from 'selectors/search-page/search-terms/navigation';
import { getCategories } from 'selectors/search-page/search-terms/categories';
import {
  recentSuggestionsSelector,
  recentSuggestionIdsSelector,
  getRecentSuggestionsRequested,
} from 'selectors/search-page/search-results/recent-suggestions';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';
import { saveToRecent, fetchRecentSearchItems, fetchedEmptyRecentSearchItems } from 'actions/search-page';


function mapStateToProps(state, ownProps) {
  return {
    recentSuggestions: recentSuggestionsSelector(state),
    categories: getCategories(state),
    focusedItem: focusedSearchTermItemSelector(state),
    totalItemCount: totalItemCountSelector(state),
    navigationKeys: navigationKeySelector(state),
    recentSuggestionIds: recentSuggestionIdsSelector(state),
    recentSuggestionsRequested: getRecentSuggestionsRequested(state),
  };
}

const mapDispatchToProps = {
  move,
  resetNavigation,
  addOrRemoveItemInPinboard,
  saveToRecent,
  fetchRecentSearchItems,
  fetchedEmptyRecentSearchItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTerms);
