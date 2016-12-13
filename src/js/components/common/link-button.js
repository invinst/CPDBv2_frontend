import React, { Component, PropTypes } from 'react';

import Link from './react-router-link';
import Hoverable from 'components/common/higher-order/hoverable';


class LinkButton extends Component {
  render() {
    const { link, hovering, normalStyle, hoverStyle, children } = this.props;

    return (
      <Link to={ link } style={ hovering ? hoverStyle : normalStyle }>
        { children }
      </Link>
    );
  }
}

LinkButton.propTypes = {
  link: PropTypes.string,
  hovering: PropTypes.bool,
  normalStyle: PropTypes.object,
  hoverStyle: PropTypes.object,
  children: PropTypes.node
};

export default Hoverable(LinkButton);
