import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { wrapperStyle } from './involvement.style';
import InvolvementItem from './involvement-item';


export default class Involvement extends Component {
  render() {
    const { involvements, openBottomSheetWithOfficer } = this.props;

    if (!involvements || involvements.length === 0) {
      return null;
    }

    return (
      <div style={ wrapperStyle }>
        {
          map(involvements, ({ involvedType, officers }, index) => (
            <InvolvementItem
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
