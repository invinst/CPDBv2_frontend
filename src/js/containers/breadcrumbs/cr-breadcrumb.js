import React from 'react';
import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';
import CRBreadcrumb from 'components/breadcrumbs/cr-breadcrumb';
import { getCRID } from 'selectors/cr-page';

function mapStateToProps(state) {
  return {
    crid: getCRID(state),
  };
}

export default connect(mapStateToProps)(breadcrumbify(CRBreadcrumb));
