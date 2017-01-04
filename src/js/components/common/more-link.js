import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import Link from 'components/common/react-router-link';
import ConfiguredRadium from 'utils/configured-radium';
import UnderlineText from 'components/common/underline-text';
import { linkStyle } from './more-link.style';


class MoreLink extends Component {
  render() {
    const { to, children, style, href, hovering, onClick } = this.props;

    if (to) {
      return (
        <Link to={ to }
          className='test--more-link'
          onMouseOver={ this.handleMouseOver }
          onMouseOut={ this.handleMouseOut }
          style={ linkStyle }>
          <UnderlineText hovering={ hovering } style={ style }>
            { children }
          </UnderlineText>
        </Link>
      );
    }

    return (
      <a href={ href }
        className='test--more-link'
        onMouseOver={ this.handleMouseOver }
        onMouseOut={ this.handleMouseOut }
        onClick={ onClick }
        style={ linkStyle }>
        <UnderlineText hovering={ hovering } style={ style }>
          { children }
        </UnderlineText>
      </a>
    );
  }
}

MoreLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  hovering: PropTypes.bool,
  onClick: PropTypes.func
};

MoreLink.defaultProps = {
  style: {}
};

export default Hoverable(ConfiguredRadium(MoreLink));
