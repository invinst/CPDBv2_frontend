import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Hoverable from 'components/common/higher-order/hoverable';


export function HoverableButton(props) {
  const { hovering, style, onClick, children, disabled, className } = props;
  const buttonStyle = disabled ?
    style.disabled :
    (hovering ? style.hover : style.base);
  const _className = classNames('link--transition', 'hoverable-button', className);

  return (
    <a
      className={ _className }
      onClick={ !disabled ? onClick : null }
      style={ buttonStyle }>
      { children }
    </a>
  );
}

HoverableButton.propTypes = {
  hovering: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

HoverableButton.defaultProps = {
  style: {},
};

export default Hoverable(HoverableButton);
