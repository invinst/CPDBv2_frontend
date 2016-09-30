import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import Link from 'components/common/react-router-link';
import ConfiguredRadium from 'utils/configured-radium';
import {
  baseStyle, underlineStyle, underlineWrapperStyle, underlineHoverStyle, baseHoverStyle
} from './more-link.style';


class MoreLink extends Component {
  render() {
    const { to, children, style, href, hovering, onClick } = this.props;
    const _baseStyle = style.base || {};
    const _underlineStyle = style.underline || {};

    if (to) {
      return (
        <Link to={ to }
          onMouseOver={ this.handleMouseOver }
          onMouseOut={ this.handleMouseOut }
          className='link--transition'
          style={ hovering ? [baseHoverStyle, _baseStyle.hover] : [baseStyle, _baseStyle.base] }>
          { children }
          <span style={ underlineWrapperStyle }>
            <span className='link--transition'
              style={ hovering ?
                [underlineHoverStyle, _underlineStyle.hover] :
                [underlineStyle, _underlineStyle.base] }/>
          </span>
        </Link>
      );
    }

    return (
      <a href={ href }
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }
        onClick={ onClick }
        className='link--transition'
        style={ hovering ? [baseHoverStyle, _baseStyle.hover] : [baseStyle, _baseStyle.base] }>
        { children }
        <span style={ underlineWrapperStyle }>
          <span className='link--transition'
            style={ hovering ?
                [underlineHoverStyle, _underlineStyle.hover] :
                [underlineStyle, _underlineStyle.base] }/>
        </span>
      </a>
    );
  }
}

MoreLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.shape({
    base: PropTypes.shape({
      base: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      hover: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    }),
    underline: PropTypes.shape({
      base: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      hover: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    })
  }),
  hovering: PropTypes.bool,
  onClick: PropTypes.func
};

MoreLink.defaultProps = {
  style: {}
};

export default Hoverable(ConfiguredRadium(MoreLink));
