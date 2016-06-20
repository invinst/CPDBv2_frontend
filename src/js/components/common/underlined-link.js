import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
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

export default ConfiguredRadium(UnderlinedLink);
