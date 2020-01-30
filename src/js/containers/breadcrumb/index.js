import { connect } from 'react-redux';
import Breadcrumbs from 'components/breadcrumb';
import { breadcrumbItemsSelector } from 'selectors/breadcrumbs';


function mapStateToProps(state, ownProps) {
  return {
    breadcrumbs: breadcrumbItemsSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(Breadcrumbs);
