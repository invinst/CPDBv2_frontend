import { connect } from 'react-redux';

import SearchTerms from 'components/search-page/search-terms';
import { move, resetNavigation } from 'actions/search-page/search-terms';
import {
  focusedSearchTermItemSelector,
  totalItemCountSelector,
  navigationKeySelector
} from 'selectors/search-page/search-terms/navigation';
import { categoriesSelector } from 'selectors/search-page/search-terms/categories';


function mapStateToProps(state, ownProps) {
  return {
    recentSuggestions: state.searchPage.recentSuggestions,
    categories: categoriesSelector(state),
    focusedItem: focusedSearchTermItemSelector(state),
    totalItemCount: totalItemCountSelector(state),
    navigationKeys: navigationKeySelector(state)
  };
}

const mapDispatchToProps = {
  move,
  resetNavigation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTerms);
