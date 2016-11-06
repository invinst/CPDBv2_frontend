import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { wrapperStyle, iconStyle } from './toolbar-button.style';


class ToolbarButton extends Component {
  render() {
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
