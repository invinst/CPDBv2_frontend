import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';


class HoverableButton extends Component {
  render() {
    const { hovering, style, onClick, children } = this.props;
    return (
      <a
        onClick={ onClick }
        style={ hovering ? style.hover : style.base }>
        { children }
      </a>
    );
  }
}

HoverableButton.propTypes = {
  hovering: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node
};

HoverableButton.defaultProps = {
  style: {}
};

export default Hoverable(HoverableButton);
