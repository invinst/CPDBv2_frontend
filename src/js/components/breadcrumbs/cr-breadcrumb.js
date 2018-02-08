import React, { PropTypes } from 'react';

export default function CRBreadcrumb({ crid }) {
  return <span>{ `CR ${crid}` }</span>;
}

CRBreadcrumb.propTypes = {
  crid: PropTypes.string,
};
