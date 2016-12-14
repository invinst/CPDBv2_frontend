import React, { Component, PropTypes } from 'react';

import Link from './react-router-link';
import Hoverable from 'components/common/higher-order/hoverable';


class HoverableLink extends Component {
  render() {
    const { to, hovering, style, children } = this.props;

    return (
      <Link to={ to } style={ hovering ? style.hover : style.base }>
        { children }
      </Link>
    );
  }
}

HoverableLink.propTypes = {
  to: PropTypes.string,
  hovering: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
};

export default Hoverable(HoverableLink);
