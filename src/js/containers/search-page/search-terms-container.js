import { connect } from 'react-redux';

import SearchTerms from 'components/search-page/search-terms';
import { requestSearchTermCategories } from 'actions/search-page/search-terms';
import { categoriesSelector } from 'selectors/search-page/search-terms';


function mapStateToProps(state, ownProps) {
  return {
    categories: categoriesSelector(state)
  };
}

const mapDispatchToProps = {
  requestSearchTermCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTerms);
