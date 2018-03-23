import React, { PropTypes } from 'react';

import {
  showingStyle,
  dateStyle,
  wrapperShowingStyle,
  unitChangeStyle,
  oldUnitStyle,
  newUnitStyle,
  rankStyle,
  unitStyle,
} from './unit-change-item.style';
import BaseItem from '../base-item';


export default class UnitChangeItem extends BaseItem {
  constructor(props) {
    super(props);

    this.height = 24;
  }

  renderRankAndUnit() {
    const { isFirstRank, isLastRank, isFirstUnit, isLastUnit, rankDisplay } = this.props.item;
    return (
      <span>
        <span style={ rankStyle(this.height, isFirstRank, isLastRank) }>{ rankDisplay }</span>
        <span style={ unitStyle(this.height, isFirstUnit, isLastUnit) }>UNIT CHANGE</span>
      </span>
    );
  }

  renderShowing() {
    const { unitName, oldUnitName, oldUnitDescription, unitDescription, date } = this.props.item;
    return (
      <span style={ wrapperShowingStyle }>
        <span style={ showingStyle }>
          <span style={ unitChangeStyle }>
            <span style={ oldUnitStyle }>Unit { oldUnitName } - { oldUnitDescription } → </span>
            <span style={ newUnitStyle }>Unit { unitName } - { unitDescription }</span>
          </span>
          <span style={ dateStyle }>{ date }</span>
        </span>
      </span>
    );
  }
}

UnitChangeItem.propTypes = {
  item: PropTypes.object,
};
