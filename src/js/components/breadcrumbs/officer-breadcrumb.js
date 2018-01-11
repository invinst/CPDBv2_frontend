import React, { PropTypes } from 'react';

export default function OfficerBreadcrumb({ officerName }) {
  return <span>{ officerName }</span>;
}

OfficerBreadcrumb.propTypes = {
  officerName: PropTypes.string,
};
