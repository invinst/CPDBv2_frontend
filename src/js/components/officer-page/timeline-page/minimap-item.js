import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { itemStyle } from './minimap-item.style';


export class MinimapItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.hovering !== this.props.hovering) {
      const { onHover } = this.props;
      onHover(nextProps.hovering);
    }
  }

  render() {
    const { text, hovering, active, onClick, className, timelineItemHovered } = this.props;
    return (
      <span className={ className } style={ itemStyle(hovering || timelineItemHovered, active) } onClick={ onClick }>
        { text }
      </span>
    );
  }
}

MinimapItem.propTypes = {
  text: PropTypes.string,
  hovering: PropTypes.bool,
  className: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  timelineItemHovered: PropTypes.bool
};

export default Hoverable(MinimapItem);
