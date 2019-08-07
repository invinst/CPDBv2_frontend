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

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { item, timelineIdx } = this.props;

    return !isEqual(item, nextProps.item) ||
      (
        timelineIdx !== nextProps.timelineIdx &&
        (timelineIdx === item.timelineIdx || nextProps.timelineIdx === item.timelineIdx)
      );
  }

  handleClick() {
    const { item, updateSelectedCrid } = this.props;
    if (item.kind === 'CR') {
      updateSelectedCrid(item.crid);
    }
  }

  render() {
    const { item, timelineIdx } = this.props;
    const componentMap = {
      [NEW_TIMELINE_ITEMS.CR]: Cr,
      [NEW_TIMELINE_ITEMS.YEAR]: Year
    };
    const ItemComponent = componentMap[item.kind];
    const isActive = !isUndefined(timelineIdx) && item.timelineIdx === timelineIdx;

    return (
      <div
        className={ cx(styles.item, 'cr-preview-link', { 'active': isActive }) }
        id={ !isUndefined(item.timelineIdx) ? `trigger-${item.timelineIdx}` : '' }
        onClick={ this.handleClick }
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
  updateSelectedCrid: PropTypes.func,
};
