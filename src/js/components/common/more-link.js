import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import Link from 'components/common/react-router-link';
import ConfiguredRadium from 'utils/configured-radium';
import {
  baseStyle, underlineStyle, underlineWrapperStyle, underlineHoverStyle, baseHoverStyle
} from './more-link.style';


class MoreLink extends Component {
  render() {
    const { to, children, style, href, showAccentColor, hovering } = this.props;

    if (to) {
      return (
        <Link to={ to }
          onMouseOver={ this.handleMouseOver }
          onMouseOut={ this.handleMouseOut }
          className='link--transition'
          style={ [hovering ? baseHoverStyle : baseStyle, style] }>
          { children }
          <span style={ underlineWrapperStyle }>
            <span className='link--transition'
              style={ [underlineStyle, (hovering || showAccentColor) && underlineHoverStyle] }/>
          </span>
        </Link>
      );
    }

    return (
      <a href={ href }
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }
        className='link--transition'
        style={ [hovering ? baseHoverStyle : baseStyle, style] }>
        { children }
        <span style={ underlineWrapperStyle }>
          <span className='link--transition'
            style={ [underlineStyle, (hovering || showAccentColor) && underlineHoverStyle] }/>
        </span>
      </a>
    );
  }
}

MoreLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  showAccentColor: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  hovering: PropTypes.bool
};

export default Hoverable(ConfiguredRadium(MoreLink));
