import React, { PropTypes, Component } from 'react';

import {
  dateStyle,
  newUnitStyle,
  oldUnitStyle,
  showingStyle,
  unitChangeStyle,
  wrapperShowingStyle,
} from './unit-change.style';


export default class UnitChange extends Component {
  render() {
    const {
      unitName, oldUnitName, oldUnitDescription, unitDescription, date, hasBorderBottom,
    } = this.props.item;
    const { baseWrapperShowingStyle, baseShowingStyle, baseDateStyle } = this.props.baseStyles;

    return (
      <span style={ { ...baseWrapperShowingStyle, ...wrapperShowingStyle } }>
        <span style={ { ...baseShowingStyle(hasBorderBottom), ...showingStyle } }>
          <span style={ unitChangeStyle } className='test--unit-change-item-content'>
            {
              oldUnitName === 'Unassigned' ?
                <span style={ oldUnitStyle(true) }>Unassigned → </span>
              :
                <span style={ oldUnitStyle(false) }>{ oldUnitName } - { oldUnitDescription } → </span>
            }
            <span style={ newUnitStyle }>{ unitName } - { unitDescription }</span>
          </span>
          <span style={ { ...baseDateStyle, ...dateStyle } } className='test--unit-change-item-date'>{ date }</span>
        </span>
      </span>
    );
  }
}

UnitChange.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  baseStyles: PropTypes.object,
};
