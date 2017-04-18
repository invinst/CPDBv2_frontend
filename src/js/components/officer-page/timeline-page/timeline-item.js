import React, { PropTypes, Component, createElement } from 'react';

import { TimelineItemType } from 'utils/constants';
import Hoverable from 'components/common/higher-order/hoverable';
import CrItem from './cr-item';
import YearItem from './year-item';
import UnitItem from './unit-item';
import JoinedItem from './joined-item';
import { wrapperStyle } from './timeline-item.style';


class TimelineItem extends Component {
  constructor(props) {
    super(props);
    this.contentMap = {
      [TimelineItemType.CR]: CrItem,
      [TimelineItemType.YEAR]: YearItem,
      [TimelineItemType.JOINED]: JoinedItem,
      [TimelineItemType.UNIT]: UnitItem
    };
  }
  render() {
    const { item, hovering } = this.props;
    const child = createElement(this.contentMap[item.kind], { item, hovering });
    return (
      <div style={ wrapperStyle(hovering) }>{ child }</div>
    );
  }
}

TimelineItem.propTypes = {
  item: PropTypes.object,
  hovering: PropTypes.bool
};

export default Hoverable(TimelineItem);
