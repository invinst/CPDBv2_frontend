import PropTypes from 'prop-types';
import React from 'react';

export default function BreadcrumbItem({ text }) {
  return <span>{ text }</span>;
}

BreadcrumbItem.propTypes = {
  text: PropTypes.string,
};
