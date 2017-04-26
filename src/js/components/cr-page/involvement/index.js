import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { wrapperStyle, involvedTextStyle, lastInvolvementStyle } from './involvement.style';
import InvolvementItem from './involvement-item';


export default class Involvement extends Component {
  render() {
    const { involvements, openBottomSheetWithOfficer } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ involvedTextStyle }>INVOLVED</div>
        {
          map(involvements, ({ involvedType, officers }, index) => (
            <InvolvementItem style={ index === involvements.length - 1 ? lastInvolvementStyle : {} }
              openBottomSheetWithOfficer={ openBottomSheetWithOfficer }
              key={ index } involvedType={ involvedType } officers={ officers } />)
          )
        }
      </div>
    );
  }
}

Involvement.propTypes = {
  involvements: PropTypes.array,
  openBottomSheetWithOfficer: PropTypes.func
};
