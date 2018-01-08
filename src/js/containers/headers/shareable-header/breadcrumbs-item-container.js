import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import BreadcrumbsItem from 'components/headers/shareable-header/breadcrumbs-item';
import { getShareablePageScrollPosition } from 'selectors/headers/shareable-header';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    scrollPosition: getShareablePageScrollPosition()
  };
}

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsItem));
