import React, { Component, PropTypes } from 'react';
import { map, keys, entries } from 'lodash';

import { wrapperStyle } from './involvement.style';
import InvolvementItem from './involvement-item';


export default class Involvement extends Component {
  render() {
    const { involvements, openOfficerPage } = this.props;

    if (!involvements || keys(involvements).length === 0) {
      return null;
    }

    return (
      <div style={ wrapperStyle }>
        {
          map(entries(involvements), ([involvedType, officers], index) => (
            <InvolvementItem
              openOfficerPage={ openOfficerPage }
              key={ index } involvedType={ involvedType } officers={ officers } />)
          )
        }
      </div>
    );
  }
}

Involvement.propTypes = {
  involvements: PropTypes.object,
  openOfficerPage: PropTypes.func
};
