import PropTypes from 'prop-types';
import React from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import * as toolbarButtonStyle from './toolbar-button.style';


export function ToolbarButton(props) {
  const { wrapperStyle, iconStyle } = toolbarButtonStyle;
  const { className, hovering, icon, activeIcon, onClick, active } = props;
  const iconToUse = active ? activeIcon : icon;

  return (
    <div style={ wrapperStyle({ active, hovering }) } onClick={ onClick } className={ className }>
      <div style={ iconStyle(iconToUse) }/>
    </div>
  );
}

ToolbarButton.propTypes = {
  className: PropTypes.string,
  hovering: PropTypes.bool,
  icon: PropTypes.string,
  activeIcon: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default Hoverable(ToolbarButton);
