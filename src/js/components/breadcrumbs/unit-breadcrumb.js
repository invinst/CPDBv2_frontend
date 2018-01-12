import React, { PropTypes } from 'react';

export default function UnitBreadcrumb({ unitName, summary }) {
  return <span>{ `${unitName} ${summary.description}` }</span>;
}

UnitBreadcrumb.propTypes = {
  unitName: PropTypes.string,
  summary: PropTypes.object,
};
