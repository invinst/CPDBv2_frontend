import React, { Component, PropTypes } from 'react';

import {
  rankStyle,
  showingStyle,
  style,
  unitStyle,
  dateStyle,
  wrapperShowingStyle,
  unitChangeStyle,
  oldUnitStyle,
  newUnitStyle,
} from './unit-change-item.style';


export default class UnitChangeItem extends Component {
  render() {
    const { item, oldUnitName } = this.props;
    return (
      <div style={ style }>
        <span style={ rankStyle }>{ item.rank }</span>
        <span style={ unitStyle }>UNIT CHANGE</span>
        <span style={ wrapperShowingStyle }>
          <span style={ showingStyle }>
            <span style={ unitChangeStyle }>
              <span style={ oldUnitStyle }>{oldUnitName} → </span>
              <span style={ newUnitStyle }>Unit {item.unitName} - { item.unitDescription }</span>
            </span>
            <span style={ dateStyle }>{ item.date }</span>
          </span>
        </span>
      </div>
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
