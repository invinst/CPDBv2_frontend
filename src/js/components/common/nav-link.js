import React, { PropTypes } from 'react';
import Radium from 'radium';

import { navStyle } from './nav-link.style';


class NavigationLink extends React.Component {
  render() {
    return (
      <a href={ this.props.href } style={ [navStyle, this.props.style] }>
        { this.props.children }
      </a>
    );
  }
}

NavigationLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  style: PropTypes.object
};

export default Radium(NavigationLink);
