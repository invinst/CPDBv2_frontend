import React from 'react';
import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';

import { breadcrumbTextSelector } from 'selectors/breadcrumbs';
import BreadcrumbItem from 'components/breadcrumb-item';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    text: breadcrumbTextSelector(state, ownProps),
  };
}

export default connect(mapStateToProps)(breadcrumbify(BreadcrumbItem));
