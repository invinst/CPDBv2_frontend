import React, { Component, PropTypes } from 'react';
import { chunk } from 'lodash';

import { metricSectionStyle, wrapperStyle, verticalLineStyle } from './metrics-section.style';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';


export default class MetricsSection extends Component {

  render() {
    const metrics = [
      {
        value: 76,
        name: 'Allegations',
        description: 'More than ##% of other officers',
      },
      {
        value: 0,
        name: 'Sustained',
        description: '# Disciplined',
      },
      {
        value: 6,
        name: 'Use of Force Reports ',
        description: 'More than ##% of other officers',
      },
      {
        value: 0,
        name: 'Civilian Compliments',
        description: '',
      },
      {
        value: 0,
        name: 'Major Awards',
        description: '',
      },
      {
        value: 6,
        name: 'Honorable Mentions',
        description: 'More than ##% of other officers',
      }
    ];

    const metricChunks = chunk(metrics, 2);
    const firstChunks = metricChunks[0];
    const secondChunks = metricChunks[1];
    const thirdChunks = metricChunks[2];

    return (
      <div style={ wrapperStyle }>
        <div style={ metricSectionStyle }>
          <MetricsColumn metrics={ firstChunks } dashedSeparator={ true }/>
          <div style={ verticalLineStyle }/>
          <MetricsColumn metrics={ secondChunks }/>
          <div style={ verticalLineStyle }/>
          <MetricsColumn metrics={ thirdChunks }/>
        </div>
      </div>
    );
  }
}

MetricsSection.propTypes = {
  metrics: PropTypes.array,
};
