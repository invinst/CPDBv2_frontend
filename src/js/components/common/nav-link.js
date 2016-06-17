import React, { PropTypes } from 'react';
import Radium from 'radium';
import Link from 'components/common/react-router-link';

import { navStyle } from './nav-link.style';


class NavigationLink extends React.Component {
  render() {
    return (
      <Link className='link--transition' to={ this.props.href } style={ navStyle }>
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
