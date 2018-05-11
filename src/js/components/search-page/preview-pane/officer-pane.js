import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';
import { isNil } from 'lodash';

import WidgetWrapper, {
  VisualTokenWidget,
  OfficerInfoWidget,
  MetricWidget,
  CallToActionWidget,
} from './widgets';

import { gradientStyle, responsiveContainerStyle } from './officer-pane.style';


export default class OfficerPane extends Component {
  render() {
    const {
      fullName,
      age,
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
      majorAwardCount,
      honorableMentionPercentile,
      to,
      lastPercentile,
    } = this.props;

    const formatValue = (value) => isNil(value) ? 'N/A' : value;
    const metrics = [
      {
        name: 'Allegations',
        value: formatValue(complaintCount),
        description: complaintPercentile && `More than ${complaintPercentile}% of other officers`,
      },
      {
        name: 'Sustained',
        value: formatValue(sustainedCount),
        isHighlight: true,
        description: !isNil(disciplineCount) && `${disciplineCount} Disciplined`,
      },
      {
        name: 'Use of Force Reports',
        value: formatValue(trrCount),
        description: trrPercentile && `More than ${trrPercentile}% of other officers`,
      },
      {
        name: <span>Civilian<br/>Compliments</span>,
        value: formatValue(civilianComplimentCount),
      },
      {
        name: 'Major Awards',
        value: formatValue(majorAwardCount),
      },
      {
        name: 'Honorable Mentions',
        value: formatValue(honorableMentionCount),
        description: honorableMentionPercentile && `More than ${honorableMentionPercentile}% of other officers`,
      },
    ];
    return (
      <WidgetWrapper>
        <div style={ responsiveContainerStyle }>
          <VisualTokenWidget { ...lastPercentile }/>
          <OfficerInfoWidget
            fullName={ fullName }
            appointedDate={ appointedDate }
            age={ age }
            unit={ unit }
            badge={ badge }
            race={ race }
            gender={ gender }
          />
          <MetricWidget metrics={ metrics }/>
          <MediaQuery maxHeight={ 990 }>
            <div className='test--gradient' style={ gradientStyle }/>
          </MediaQuery>
        </div>
        <CallToActionWidget to={ to }/>
      </WidgetWrapper>
    );
  }
}

OfficerPane.propTypes = {
  fullName: PropTypes.string,
  age: PropTypes.number,
  appointedDate: PropTypes.string,
  unit: PropTypes.shape({
    id: PropTypes.number,
    unitName: PropTypes.string,
    description: PropTypes.string,
  }),
  badge: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  complaintCount: PropTypes.number,
  complaintPercentile: PropTypes.number,
  sustainedCount: PropTypes.number,
  disciplineCount: PropTypes.number,
  trrCount: PropTypes.number,
  trrPercentile: PropTypes.number,
  civilianComplimentCount: PropTypes.number,
  majorAwardCount: PropTypes.number,
  honorableMentionCount: PropTypes.number,
  honorableMentionPercentile: PropTypes.number,
  to: PropTypes.string,
  lastPercentile: PropTypes.shape({
    items: PropTypes.array,
    visualTokenBackground: PropTypes.string,
  }),
};
