import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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
    const { position, officerId } = this.props;
    return <Link to={ `/officer/${officerId}/` } className='test--pair-card-half' style={ wrapper(position) } />;
  }
}

HalfPane.propTypes = {
  hovering: PropTypes.bool,
  position: PropTypes.string,
  onHovering: PropTypes.func,
  officerId: PropTypes.number,
};

export default Hoverable(HalfPane);
