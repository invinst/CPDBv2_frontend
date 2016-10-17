import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';


class HoverableButton extends Component {
  render() {
    const { hovering, style, onClick, children, disabled } = this.props;
    const buttonStyle = disabled ?
      style.disabled :
      (hovering ? style.hover : style.base);

    return (
      <a
        className='link--transition'
        onClick={ !disabled ? onClick : null }
        style={ buttonStyle }>
        { children }
      </a>
    );
  }
}

HoverableButton.propTypes = {
  hovering: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

HoverableButton.defaultProps = {
  style: {}
};

export default Hoverable(HoverableButton);
