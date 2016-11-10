import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Hoverable from 'components/common/higher-order/hoverable';


export class HoverableButton extends Component {
  render() {
    const { hovering, style, onClick, children, disabled, className } = this.props;
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
}

HoverableButton.propTypes = {
  hovering: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

HoverableButton.defaultProps = {
  style: {}
};

export default Hoverable(HoverableButton);
