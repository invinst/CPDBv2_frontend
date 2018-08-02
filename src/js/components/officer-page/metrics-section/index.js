import React, { Component, PropTypes } from 'react';
import { chunk, get } from 'lodash';
import pluralize from 'pluralize';

import { metricSectionStyle, verticalLineStyle, wrapperStyle } from './metrics-section.style';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';
import { roundedPercentile } from 'utils/calculations';
import { POPUP_NAMES } from 'utils/constants';


export default class MetricsSection extends Component {
  getDescription(percentile) {
    if (percentile !== 'N/A') {
      return `More than ${roundedPercentile(percentile)}% of other officers`;
    }
    return null;
  }

  render() {
    const { popup } = this.props;
    const {
      allegationCount,
      allegationPercentile,
      honorableMentionCount,
      sustainedCount,
      disciplineCount,
      honorableMentionPercentile,
      useOfForceCount,
      majorAwardCount,
      useOfForcePercentile,
      civilianComplimentCount,
    } = this.props.metrics;

    const metrics = [
      {
        value: allegationCount,
        name: `${pluralize('Allegation', allegationCount)}`,
        description: this.getDescription(allegationPercentile),
        popup: {
          ...get(popup, POPUP_NAMES.OFFICER.ALLEGATION),
          position: 'absolute',
        }
      },
      {
        value: sustainedCount,
        name: 'Sustained',
        description: `${disciplineCount} Disciplined`,
        highlightValue: true,
        popup: {
          ...get(popup, POPUP_NAMES.OFFICER.SUSTAINED),
          position: 'absolute',
        },
      },
      {
        value: useOfForceCount,
        name: `Use of Force ${pluralize('Report', useOfForceCount)}`,
        description: this.getDescription(useOfForcePercentile),
        popup: {
          ...get(popup, POPUP_NAMES.OFFICER.TRR),
          position: 'absolute',
        }
      },
      {
        value: civilianComplimentCount,
        name: `Civilian ${pluralize('Compliment', civilianComplimentCount)}`,
        description: '',
        popup: {
          ...get(popup, POPUP_NAMES.OFFICER.CIVILIAN_COMPLIMENT),
          position: 'absolute',
        }
      },
      {
        value: majorAwardCount,
        name: `Major ${pluralize('Award', majorAwardCount)}`,
        description: '',
        popup: {
          ...get(popup, POPUP_NAMES.OFFICER.MAJOR_AWARD),
          position: 'absolute',
        }
      },
      {
        value: honorableMentionCount,
        name: `Honorable ${pluralize('Mention', honorableMentionCount)}`,
        description: this.getDescription(honorableMentionPercentile),
        popup: {
          ...get(popup, POPUP_NAMES.OFFICER.HONORABLE_MENTION),
          position: 'absolute',
        }
      }
    ];

    const metricChunks = chunk(metrics, 2);
    const firstChunk = metricChunks[0];
    const secondChunk = metricChunks[1];
    const thirdChunk = metricChunks[2];

    return (
      <div style={ wrapperStyle }>
        <div style={ metricSectionStyle }>
          <MetricsColumn metrics={ firstChunk } dashedSeparator={ true }/>
          <div style={ verticalLineStyle }/>
          <MetricsColumn metrics={ secondChunk }/>
          <div style={ verticalLineStyle }/>
          <MetricsColumn metrics={ thirdChunk }/>
        </div>
      </div>
    );
  }
}

MetricsSection.propTypes = {
  metrics: PropTypes.object,
  popup: PropTypes.object,
};

MetricsSection.defaultProps = {
  metrics: {},
};
