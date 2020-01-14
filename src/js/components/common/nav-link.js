import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import ConfiguredRadium from 'utils/configured-radium';
import { navStyle } from './nav-link.style';


function NavigationLink(props) {
  const { children, href, isActive } = props;

  return (
    <Link className='link--transition'
      to={ href }
      style={ isActive ? { ...navStyle.base, ...navStyle.active } : navStyle.base }>
      { children }
    </Link>
  );
}

NavigationLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  isActive: PropTypes.bool,
};

NavigationLink.defaultProps = {
  isActive: false,
};

export default ConfiguredRadium(NavigationLink);
