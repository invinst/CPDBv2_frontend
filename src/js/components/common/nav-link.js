import React, {PropTypes} from 'react';
import Radium from 'radium';

import { navStyle } from 'components/common/nav-link.style';


class NavigationLink extends React.Component {
  render() {
    return (
      <a href={ this.props.href } style={ navStyle }>
        { this.props.children }
      </a>
    );
  }
}

NavigationLink.propTypes = {
  children: PropTypes.array,
  href: PropTypes.string
};

export default Radium(NavigationLink);
