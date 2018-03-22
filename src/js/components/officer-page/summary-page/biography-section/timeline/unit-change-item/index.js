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
    const { item, oldUnitName } = this.props;
    return (
      <span style={ wrapperShowingStyle }>
        <span style={ showingStyle }>
          <span style={ unitChangeStyle }>
            <span style={ oldUnitStyle }>{oldUnitName} → </span>
            <span style={ newUnitStyle }>Unit {item.unitName} - { item.unitDescription }</span>
          </span>
          <span style={ dateStyle }>{ item.date }</span>
        </span>
      </span>
    );
  }
}

UnitChangeItem.propTypes = {
  item: PropTypes.object,
  oldUnitName: PropTypes.string,
};

UnitChangeItem.defaultProps = {
  oldUnitName: '',
};
