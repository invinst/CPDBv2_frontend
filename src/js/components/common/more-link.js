import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import ConfiguredRadium from 'utils/configured-radium';
import UnderlineText from 'components/common/underline-text';
import { linkStyle } from './more-link.style';


function MoreLink(props) {
  const { to, children, style, href, hovering, onClick } = props;

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
      target='_blank'
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

MoreLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  hovering: PropTypes.bool,
  onClick: PropTypes.func,
};

MoreLink.defaultProps = {
  style: {},
};

export default Hoverable(ConfiguredRadium(MoreLink));
