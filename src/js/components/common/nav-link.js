import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ConfiguredRadium from 'utils/configured-radium';
import { navStyle } from './nav-link.style';


class NavigationLink extends React.Component {
  render() {
    const { children, href, isActive } = this.props;

    return (
      <Link className='link--transition'
        to={ href }
        style={ isActive ? { ...navStyle.base, ...navStyle.active } : navStyle.base }>
        { children }
      </Link>
    );
  }
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
