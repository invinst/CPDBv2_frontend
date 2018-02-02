import { connect } from 'react-redux';

import SearchTerms from 'components/search-page/search-terms';
import { requestSearchTermCategories } from 'actions/search-page/search-terms';
import { categoriesSelector, focusedItemSelector, totalItemCountSelector } from 'selectors/search-page/search-terms';
import { move } from 'actions/search-page/search-terms';


function mapStateToProps(state, ownProps) {
  return {
    categories: categoriesSelector(state),
    focusedItem: focusedItemSelector(state),
    totalItemCount: totalItemCountSelector(state)
  };
}

const mapDispatchToProps = {
  requestSearchTermCategories,
  move
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTerms);
