import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { buttonStyle } from './sidebar-button.style';


class SidebarButton extends Component {
  render() {
    const { onClick, children, hovering, style } = this.props;
    return (
      <span style={ { ...buttonStyle(hovering), ...style } } onClick={ onClick }>{ children }</span>
    );
  }
}

SidebarButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  hovering: PropTypes.bool,
  style: PropTypes.object
};

export default Hoverable(SidebarButton);
