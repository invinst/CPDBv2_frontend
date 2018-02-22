import React, { Component, PropTypes } from 'react';
import { chunk } from 'lodash';

import { metricSectionStyle, verticalLineStyle, wrapperStyle } from './metrics-section.style';
import MetricsColumn from 'components/officer-page/summary-page/metrics-section/metrics-column';


export default class MetricsSection extends Component {

  render() {
    const {
      allegationCount,
      topAllegationPercentile,
      honorableMentionCount,
      sustainedCount,
      disciplineCount,
      topHonorableMentionPercentile,
      useOfForceCount,
      majorAwardCount,
      topUseOfForcePercentile,
      civilianComplimentCount
    } = this.props.metrics;

    const metrics = [
      {
        value: allegationCount,
        name: 'Allegations',
        description: `More than ${topAllegationPercentile}% of other officers`,
      },
      {
        value: sustainedCount,
        name: 'Sustained',
        description: `${disciplineCount} Disciplined`,
      },
      {
        value: useOfForceCount,
        name: 'Use of Force Reports ',
        description: `More than ${topUseOfForcePercentile}% of other officers`,
      },
      {
        value: civilianComplimentCount,
        name: 'Civilian Compliments',
        description: '',
      },
      {
        value: majorAwardCount,
        name: 'Major Awards',
        description: '',
      },
      {
        value: honorableMentionCount,
        name: 'Honorable Mentions',
        description: `More than ${topHonorableMentionPercentile}% of other officers`,
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
  metrics: PropTypes.object,
};

MetricsSection.defaultProps = {
  metrics: {},
};
