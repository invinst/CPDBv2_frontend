import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import * as toolbarButtonStyle from './toolbar-button.style';


export class ToolbarButton extends Component {
  render() {
    const { wrapperStyle, iconStyle } = toolbarButtonStyle;
    const { hovering, icon, activeIcon, onClick, active } = this.props;
    const iconToUse = active ? activeIcon : icon;

    return (
      <div style={ wrapperStyle({ active, hovering }) } onClick={ onClick }>
        <div style={ iconStyle(iconToUse) }/>
      </div>
    );
  }
}

ToolbarButton.propTypes = {
  hovering: PropTypes.bool,
  icon: PropTypes.string,
  activeIcon: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool
};

export default Hoverable(ToolbarButton);
