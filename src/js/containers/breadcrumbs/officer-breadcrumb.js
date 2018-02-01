import React from 'react';
import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';
import OfficerBreadcrumb from 'components/breadcrumbs/officer-breadcrumb';
import { breadcrumbCachedFullName } from 'selectors/officer-page';

function mapStateToProps(state) {
  return {
    officerName: breadcrumbCachedFullName(state),
  };
}

export default connect(mapStateToProps)(breadcrumbify(OfficerBreadcrumb));
