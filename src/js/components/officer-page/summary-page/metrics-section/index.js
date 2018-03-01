import React, { Component, PropTypes } from 'react';
import { chunk } from 'lodash';
import pluralize from 'pluralize';

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
        name: `${pluralize('Allegation', allegationCount)}`,
        description: `More than ${topAllegationPercentile}% of other officers`,
      },
      {
        value: sustainedCount,
        name: 'Sustained',
        description: `${disciplineCount} Disciplined`,
        highlightValue: true,
      },
      {
        value: useOfForceCount,
        name: `Use of Force ${pluralize('Report', useOfForceCount)}`,
        description: `More than ${topUseOfForcePercentile}% of other officers`,
      },
      {
        value: civilianComplimentCount,
        name: `Civilian ${pluralize('Compliment', civilianComplimentCount)}`,
        description: '',
      },
      {
        value: majorAwardCount,
        name: `Major ${pluralize('Award', majorAwardCount)}`,
        description: '',
      },
      {
        value: honorableMentionCount,
        name: `Honorable ${pluralize('Mention', honorableMentionCount)}`,
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
