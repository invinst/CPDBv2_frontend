import React, { Component, PropTypes } from 'react';
import { chunk } from 'lodash';
import pluralize from 'pluralize';

import { metricSectionStyle, verticalLineStyle, wrapperStyle, popupStyle } from './metrics-section.style';
import MetricsColumn from 'components/officer-page/metrics-section/metrics-column';
import { roundedPercentile } from 'utils/calculations';


export default class MetricsSection extends Component {

  render() {
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
          title: 'Complaint Category',
          text: 'Due to limitations in the data systems used by the CPD and its oversight agencies, most complaints ' +
          'are given a single complaint category, typically the most serious allegation. This means that if one ' +
          'officer is accused of excessive force and two fellow officers are accused of not reporting the excessive ' +
          'force, all three officers may have a complaint marked as excessive force.',
          style: popupStyle,
        },
      },
      {
        value: sustainedCount,
        name: 'Sustained',
        description: `${disciplineCount} Disciplined`,
        highlightValue: true,
        popup: {
          title: 'Sustained Complaints',
          text: 'Due to limitations in the data systems used by the CPD and its oversight agencies, ' +
          'if any part of a complaint against an officer is marked as “sustained” then the entire allegation against ' +
          'an officer is also marked as “sustained.” This means that if an officer receives a complaint alleging ' +
          'improper use of force, and illegal search, and incorrect paperwork, and only the paperwork violation ' +
          'is upheld, then the entire complaint is marked as “sustained.”',
          style: popupStyle,
        },
      },
      {
        value: useOfForceCount,
        name: `Use of Force ${pluralize('Report', useOfForceCount)}`,
        description: `More than ${roundedPercentile(useOfForcePercentile)}% of other officers`,
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
        description: `More than ${roundedPercentile(honorableMentionPercentile)}% of other officers`,
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
};

MetricsSection.defaultProps = {
  metrics: {},
};
