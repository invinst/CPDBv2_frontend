import React from 'react';
import { breadcrumbify } from 'redux-breadcrumb-trail';
import { connect } from 'react-redux';
import UnitBreadcrumb from 'components/breadcrumbs/unit-breadcrumb';
import { summarySelector } from 'selectors/unit-profile-page';

const mapStateToProps = (state, ownProps) => {
  return {
    unitName: ownProps.params.unitName,
    summary: summarySelector(state)
  };
};

export default connect(mapStateToProps)(breadcrumbify(UnitBreadcrumb));
