import React, { PropTypes } from 'react';
import Radium from 'radium';

import { linkStyle } from './underlined-link.style';


class UnderlinedLink extends React.Component {
  render() {
    return (
      <a href={ this.props.href } style={ [linkStyle, this.props.style] }>
        { this.props.children }
      </a>
    );
  }
}

UnderlinedLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  style: PropTypes.object
};

export default Radium(UnderlinedLink);
