import React, { PropTypes } from 'react';
import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';
import { mapStateToProps } from 'containers/officer-page';

export function OfficerBreadcrumb({ officerName }) {
  return <span>{ officerName }</span>;
}

export default connect(mapStateToProps)(breadcrumbify(OfficerBreadcrumb));

OfficerBreadcrumb.propTypes = {
  officerName: PropTypes.string,
};
