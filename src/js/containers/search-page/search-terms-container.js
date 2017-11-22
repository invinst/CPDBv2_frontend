import { connect } from 'react-redux';

import SearchTerms from 'components/search-page/search-terms';
import { requestSearchTermCategories, selectCategory } from 'actions/search-page/search-terms';
import {
  navigationItemsSelector, categoriesSelector, selectedCategoryIndexSelector
} from 'selectors/search-page/search-terms';


function mapStateToProps(state, ownProps) {
  return {
    navigationItems: navigationItemsSelector(state),
    selectedCategoryIndex: selectedCategoryIndexSelector(state),
    categories: categoriesSelector(state)
  };
}

const mapDispatchToProps = {
  requestSearchTermCategories,
  onSelectCategory: selectCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTerms);
