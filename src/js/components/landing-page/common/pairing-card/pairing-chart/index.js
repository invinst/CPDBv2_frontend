import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';

import VennDiagram from './venn-diagram';
import style from './pairing-chart.sass';


export default class PairingChart extends Component {
  render() {
    const { coaccusalCount, background1, background2 } = this.props;
    return (
      <div className={ style.pairingChart }>
        <VennDiagram coaccusalCount={ coaccusalCount } background1={ background1 } background2={ background2 } />
        <div className='pairing-chart-coaccused-text'>
          Coaccused { coaccusalCount } { pluralize('time', coaccusalCount) }
        </div>
      </div>
    );
  }
}

PairingChart.propTypes = {
  coaccusalCount: PropTypes.number,
  background1: PropTypes.string,
  background2: PropTypes.string,
};
