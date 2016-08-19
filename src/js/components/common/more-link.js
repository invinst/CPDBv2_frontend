import React, { Component, PropTypes } from 'react';

import Link from 'components/common/react-router-link';
import ConfiguredRadium from 'utils/configured-radium';
import { baseStyle, underlineStyle, underlineWrapperStyle } from './more-link.style';


class MoreLink extends Component {
  render() {
    const { to, children, style, href } = this.props;

    if (to) {
      return (
        <Link to={ to } style={ [baseStyle, style] }>
          { children }
          <span style={ underlineWrapperStyle }>
            <span style={ underlineStyle }/>
          </span>
        </Link>
      );
    }

    return (
      <a href={ href } style={ [baseStyle, style] }>
        { children }
        <span style={ underlineWrapperStyle }>
          <span style={ underlineStyle }/>
        </span>
      </a>
    );
  }
}

MoreLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object
};

export default ConfiguredRadium(MoreLink);
