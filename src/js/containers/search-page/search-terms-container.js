import { connect } from 'react-redux';

import SearchTerms from 'components/search-page/search-terms';
import { requestSearchTermCategories } from 'actions/search-page/search-terms';
import { categoriesSelector, selectedCategoryIndexSelector } from 'selectors/search-page/search-terms';


function mapStateToProps(state, ownProps) {
  return {
    selectedCategoryIndex: selectedCategoryIndexSelector(state),
    categories: categoriesSelector(state)
  };
}

const mapDispatchToProps = {
  requestSearchTermCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTerms);
