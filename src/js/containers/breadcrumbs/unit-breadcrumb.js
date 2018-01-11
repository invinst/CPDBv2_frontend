import React, { PropTypes } from 'react';
import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';
import { mapStateToProps } from 'containers/unit-profile-page';

export function UnitBreadcrumb({ unitName, summary }) {
  return <span>{ `${unitName} ${summary.description}` }</span>;
}

export default connect(mapStateToProps)(breadcrumbify(UnitBreadcrumb));

UnitBreadcrumb.propTypes = {
  unitName: PropTypes.string,
  summary: PropTypes.object,
};
