import React, { Component, PropTypes } from 'react';

import Link from './react-router-link';
import Hoverable from 'components/common/higher-order/hoverable';


class HoverableLink extends Component {
  render() {
    const { to, href, hovering, style, children } = this.props;

    if (href) {
      return (
        <a href={ href } style={ hovering ? style.hover : style.base } className='link--transition'>
          { children }
        </a>
      );
    }

    return (
      <Link to={ to } style={ hovering ? style.hover : style.base } className='link--transition'>
        { children }
      </Link>
    );
  }
}

HoverableLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  hovering: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
};

export default Hoverable(HoverableLink);
