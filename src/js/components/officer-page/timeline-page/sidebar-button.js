import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { buttonStyle } from './sidebar-button.style';


export class SideBarButton extends Component {
  render() {
    const { onClick, children, hovering, style } = this.props;
    return (
      <span style={ { ...buttonStyle(hovering), ...style } } onClick={ onClick }>{ children }</span>
    );
  }
}

SideBarButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  hovering: PropTypes.bool,
  style: PropTypes.object
};

export default Hoverable(SideBarButton);
