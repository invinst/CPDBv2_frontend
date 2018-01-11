import React, { PropTypes } from 'react';
import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';
import { mapStateToProps } from 'containers/cr-page';

export function CRBreadcrumb({ crid }) {
  return <span>{ `CR ${crid}` }</span>;
}

export default connect(mapStateToProps)(breadcrumbify(CRBreadcrumb));

CRBreadcrumb.propTypes = {
  crid: PropTypes.string,
};
