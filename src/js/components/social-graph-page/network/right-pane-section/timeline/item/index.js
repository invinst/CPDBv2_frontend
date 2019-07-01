import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isUndefined, isEqual } from 'lodash';

import Cr from './cr';
import Year from './year';
import { NEW_TIMELINE_ITEMS } from 'utils/constants';
import styles from './item.sass';


export default class Item extends Component {
  constructor(props) {
    super(props);
    const { item } = props;

    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: Cr,
      [NEW_TIMELINE_ITEMS.YEAR]: Year
    };
    const ItemComponent = componentMap[item.kind];
    this.component = <ItemComponent { ...this.props }/>;
  }

  shouldComponentUpdate(nextProps) {
    const { item, timelineIdx } = this.props;

    return !isEqual(item, nextProps.item) ||
      (
        timelineIdx !== nextProps.timelineIdx &&
        (timelineIdx === item.timelineIdx || nextProps.timelineIdx === item.timelineIdx)
      );
  }

  render() {
    const { item, timelineIdx } = this.props;
    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: Cr,
      [NEW_TIMELINE_ITEMS.YEAR]: Year
    };
    const ItemComponent = componentMap[item.kind];

    return (
      <div
        className={ cx(styles.item, { 'active': timelineIdx && item.timelineIdx === timelineIdx }) }
        id={ !isUndefined(item.timelineIdx) ? `trigger-${item.timelineIdx}` : '' }
      >
        <ItemComponent { ...this.props }/>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object,
  pathname: PropTypes.string,
  timelineIdx: PropTypes.number,
  onTrackingAttachment: PropTypes.func,
};
