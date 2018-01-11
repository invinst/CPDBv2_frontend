import React from 'react';
import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';
import OfficerBreadcrumb from 'components/breadcrumbs/officer-breadcrumb';
import { getOfficerName } from 'selectors/officer-page';

function mapStateToProps(state) {
  return {
    officerName: getOfficerName(state),
  };
}

export default connect(mapStateToProps)(breadcrumbify(OfficerBreadcrumb));
