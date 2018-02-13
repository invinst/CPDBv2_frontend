import { connect } from 'react-redux';

import SearchTerms from 'components/search-page/search-terms';
import { requestSearchTermCategories, move, resetNavigation, setNavigation } from 'actions/search-page/search-terms';
import {
  focusedSearchTermItemSelector,
  totalItemCountSelector,
  navigationKeySelector
} from 'selectors/search-page/search-terms/navigation';
import { categoriesSelector } from 'selectors/search-page/search-terms';


function mapStateToProps(state, ownProps) {
  return {
    categories: categoriesSelector(state),
    focusedItem: focusedSearchTermItemSelector(state),
    totalItemCount: totalItemCountSelector(state),
    navigationKeys: navigationKeySelector(state),
  };
}

const mapDispatchToProps = {
  requestSearchTermCategories,
  move,
  resetNavigation,
  setNavigation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTerms);
