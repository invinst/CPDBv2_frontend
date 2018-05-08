import React, { PropTypes } from 'react';

export default function BreadcrumbItem({ text }) {
  return <span>{ text }</span>;
}

BreadcrumbItem.propTypes = {
  text: PropTypes.string,
};
