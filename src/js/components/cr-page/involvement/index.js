import React, { Component, PropTypes } from 'react';
import { map, keys, entries } from 'lodash';

import InvolvementItem from './involvement-item';
import styles from './involvement.sass';


export default class Involvement extends Component {
  render() {
    const { involvements } = this.props;

    if (!involvements || keys(involvements).length === 0) {
      return null;
    }

    return (
      <div className={ styles.involvement }>
        {
          map(entries(involvements), ([involvedType, officers], index) => (
            <InvolvementItem
              key={ index }
              className={ `test--involvement-${involvedType}` }
              involvedType={ involvedType }
              officers={ officers }
            />)
          )
        }
      </div>
    );
  }
}

Involvement.propTypes = {
  involvements: PropTypes.object,
};
