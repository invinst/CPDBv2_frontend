import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const LinkWrapper = props => {
  const Component = props.to ? Link : 'a';
  return <Component { ...props }>{ props.children }</Component>;
};

LinkWrapper.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default LinkWrapper;
