import React, { PropTypes } from 'react';
import pluralize from 'pluralize';

import VennDiagram from './venn-diagram';
import style from './pairing-chart.sass';


export default function PairingChart(props) {
  const { coaccusalCount, background1, background2 } = props;
  return (
    <div className={ style.pairingChart }>
      <VennDiagram background1={ background1 } background2={ background2 } />
      <div className='pairing-chart-coaccused-text'>
        Coaccused { coaccusalCount } { pluralize('time', coaccusalCount) }
      </div>
    </div>
  );
}

PairingChart.propTypes = {
  coaccusalCount: PropTypes.number,
  background1: PropTypes.string,
  background2: PropTypes.string,
};
