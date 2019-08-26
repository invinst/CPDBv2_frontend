import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import BreadcrumbsItemRenderer from 'components/headers/shareable-header/breadcrumbs-item-renderer';
import { getShareablePageScrollPosition } from 'selectors/headers/shareable-header';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    scrollPosition: getShareablePageScrollPosition(state),
  };
}

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsItemRenderer));
