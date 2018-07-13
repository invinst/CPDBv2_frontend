import React, { Component, PropTypes } from 'react';
import { chunk } from 'lodash';
import pluralize from 'pluralize';

import { metricSectionStyle, verticalLineStyle, wrapperStyle, popupStyle } from './metrics-section.style';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';
import { roundedPercentile } from 'utils/calculations';
import { POPUP_NAMES } from 'utils/constants';


export default class MetricsSection extends Component {

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
        description: `More than ${roundedPercentile(allegationPercentile)}% of other officers`,
        popup: {
          ...popup[POPUP_NAMES.OFFICER.ALLEGATION],
          style: popupStyle,
        }
      },
      {
        value: sustainedCount,
        name: 'Sustained',
        description: `${disciplineCount} Disciplined`,
        highlightValue: true,
        popup: {
          ...popup[POPUP_NAMES.OFFICER.SUSTAINED],
          style: popupStyle,
        },
      },
      {
        value: useOfForceCount,
        name: `Use of Force ${pluralize('Report', useOfForceCount)}`,
        description: `More than ${roundedPercentile(useOfForcePercentile)}% of other officers`,
        popup: {
          ...popup[POPUP_NAMES.OFFICER.TRR],
          style: popupStyle,
        }
      },
      {
        value: civilianComplimentCount,
        name: `Civilian ${pluralize('Compliment', civilianComplimentCount)}`,
        description: '',
        popup: {
          ...popup[POPUP_NAMES.OFFICER.CIVILIAN_COMPLIMENT],
          style: popupStyle,
        }
      },
      {
        value: majorAwardCount,
        name: `Major ${pluralize('Award', majorAwardCount)}`,
        description: '',
        popup: {
          ...popup[POPUP_NAMES.OFFICER.MAJOR_AWARD],
          style: popupStyle,
        }
      },
      {
        value: honorableMentionCount,
        name: `Honorable ${pluralize('Mention', honorableMentionCount)}`,
        description: `More than ${roundedPercentile(honorableMentionPercentile)}% of other officers`,
        popup: {
          ...popup[POPUP_NAMES.OFFICER.HONORABLE_MENTION],
          style: popupStyle,
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
