import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import { navStyle } from './nav-link.style';


class NavigationLink extends React.Component {
  render() {
    return (
      <Link to={ this.props.href } style={ navStyle }>
        { this.props.children }
      </Link>
    );
  }
}

NavigationLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string
};

export default Radium(NavigationLink);
