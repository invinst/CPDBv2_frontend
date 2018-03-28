import React, { PropTypes } from 'react';

import {
  dateStyle,
  newUnitStyle,
  oldUnitStyle,
  rankStyle,
  showingStyle,
  unitChangeStyle,
  unitStyle,
  wrapperShowingStyle,
} from './unit-change-item.style';
import BaseItem from '../base-item';


export default class UnitChangeItem extends BaseItem {
  constructor(props) {
    super(props);

    this.height = 24;
    this.className = 'test--timeline-unit-change-item';
  }

  renderRankAndUnit() {
    const { isFirstRank, isLastRank, isFirstUnit, isLastUnit, rankDisplay } = this.props.item;
    return (
      <span>
        <span
          style={ rankStyle(this.height, isFirstRank, isLastRank) }
          className='test--unit-change-item-rank'
        >
          { rankDisplay }
        </span>
        <span
          style={ unitStyle(this.height, isFirstUnit, isLastUnit) }
          className='test--unit-change-item-unit'
        >
          UNIT CHANGE
        </span>
      </span>
    );
  }

  renderShowing() {
    const {
      unitName, oldUnitName, oldUnitDescription,
      unitDescription, date, hasBorderBottom
    } = this.props.item;
    return (
      <span style={ wrapperShowingStyle }>
        <span style={ showingStyle(hasBorderBottom) }>
          <span style={ unitChangeStyle } className='test--unit-change-item-content'>
            <span style={ oldUnitStyle }>Unit { oldUnitName } - { oldUnitDescription } → </span>
            <span style={ newUnitStyle }>Unit { unitName } - { unitDescription }</span>
          </span>
          <span style={ dateStyle } className='test--unit-change-item-date'>{ date }</span>
        </span>
      </span>
    );
  }
}

UnitChangeItem.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
};
