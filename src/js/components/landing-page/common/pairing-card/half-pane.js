import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { wrapper } from './half-pane.style';

class HalfPane extends Component {
  componentWillReceiveProps(nextProps) {
    const { hovering, onHovering } = nextProps;
    if (this.props.hovering != nextProps.hovering) {
      onHovering(hovering);
    }
  }

  render() {
    const { position, onClick } = this.props;
    return <div className='test--pair-card-half' style={ wrapper(position) } onClick={ onClick } />;
  }
}

HalfPane.propTypes = {
  hovering: PropTypes.bool,
  position: PropTypes.string,
  onHovering: PropTypes.func,
  onClick: PropTypes.func
};

export default Hoverable(HalfPane);
