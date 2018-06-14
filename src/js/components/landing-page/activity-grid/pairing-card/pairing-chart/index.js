import React, { Component, PropTypes } from 'react';

import VennDiagram from './venn-diagram';
import { wrapperStyle, coaccusedTextStyle } from './pairing-chart.style';

export default class PairingChart extends Component {
  render() {
    const { coaccusalCount } = this.props;
    return (
      <div style={ wrapperStyle }>
        <VennDiagram coaccusalCount={ coaccusalCount }/>
        <div style={ coaccusedTextStyle }> Coaccused { coaccusalCount } times </div>
      </div>
    );
  }
}

PairingChart.propTypes = {
  coaccusalCount: PropTypes.number,
};
