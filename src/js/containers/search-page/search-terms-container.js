import { connect } from 'react-redux';

import SearchTerms from 'components/search-page/search-terms';
import { requestSearchTermCategories, move, resetNavigation } from 'actions/search-page/search-terms';
import { categoriesSelector, focusedSearchTermItemSelector, totalItemCountSelector } from 'selectors/search-page/search-terms';


function mapStateToProps(state, ownProps) {
  return {
    categories: categoriesSelector(state),
    focusedItem: focusedSearchTermItemSelector(state),
    totalItemCount: totalItemCountSelector(state)
  };
}

const mapDispatchToProps = {
  requestSearchTermCategories,
  move,
  resetNavigation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTerms);
