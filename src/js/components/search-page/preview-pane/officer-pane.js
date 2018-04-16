import React, { Component, PropTypes } from 'react';

import WidgetWrapper, {
  VisualTokenWidget,
  OfficerInfoWidget,
  MetricWidget,
  CallToActionWidget,
} from './widgets';


export default class OfficerPane extends Component {
  render() {
    const {
      fullName,
      birthYear,
      appointedDate,
      unit,
      badge,
      race,
      gender,
      complaintCount,
      complaintPercentile,
      sustainedCount,
      disciplineCount,
      trrCount,
      trrPercentile,
      civilianComplimentCount,
      honorableMentionCount,
      url,
      lastPercentile,
    } = this.props;
    const metrics = [
      {
        name: 'Allegations',
        value: complaintCount,
        description: complaintPercentile && `More than ${complaintPercentile}% of other officers`,
      },
      {
        name: 'Sustained',
        value: sustainedCount,
        isHighlight: true,
        description: `${disciplineCount} Disciplined`,
      },
      {
        name: 'Use of Force Reports',
        value: trrCount,
        description: trrPercentile && `More than ${trrPercentile}% of other officers`,
      },
      {
        name: <span>Civilian<br/>Compliments</span>,
        value: civilianComplimentCount,
      },
      {
        name: 'Major Awards',
        value: 0,
      },
      {
        name: 'Honorable Mentions',
        value: honorableMentionCount,
        description: 'More than ##% of other officers',
      },
    ];
    return (
      <WidgetWrapper>
        <VisualTokenWidget { ...lastPercentile }/>
        <OfficerInfoWidget
          fullName={ fullName }
          appointedDate={ appointedDate }
          birthYear={ birthYear }
          unit={ unit }
          badge={ badge }
          race={ race }
          gender={ gender }
        />
        <MetricWidget metrics={ metrics }/>
        <CallToActionWidget url={ url }/>
      </WidgetWrapper>
    );
  }
}

OfficerPane.defaultProps = {
  unit: '',
  badge: 0,
  race: '',
  gender: '',
  trrCount: 0,
  disciplineCount: 0,
  complaintPercentile: null,
  trrPercentile: null,
  civilianComplimentCount: 0,
  honorableMentionCount: 0,
  url: '',
};

OfficerPane.propTypes = {
  fullName: PropTypes.string.isRequired,
  birthYear: PropTypes.number.isRequired,
  appointedDate: PropTypes.string.isRequired,
  unit: PropTypes.string,
  badge: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  complaintCount: PropTypes.number.isRequired,
  complaintPercentile: PropTypes.string,
  sustainedCount: PropTypes.number.isRequired,
  disciplineCount: PropTypes.number,
  trrCount: PropTypes.number,
  trrPercentile: PropTypes.string,
  civilianComplimentCount: PropTypes.number,
  honorableMentionCount: PropTypes.number,
  url: PropTypes.string,
  lastPercentile: PropTypes.shape({
    items: PropTypes.array,
    visualTokenBackground: PropTypes.string,
  }).isRequired,
};
