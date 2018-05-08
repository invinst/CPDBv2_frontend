import React, { Component, PropTypes } from 'react';
import MediaQuery from 'react-responsive';

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
      to,
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

OfficerPane.defaultProps = {
  unit: {},
  badge: 0,
  race: '',
  gender: '',
  trrCount: 0,
  disciplineCount: 0,
  complaintPercentile: null,
  trrPercentile: null,
  civilianComplimentCount: 0,
  honorableMentionCount: 0,
  to: '',
};

OfficerPane.propTypes = {
  fullName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  appointedDate: PropTypes.string.isRequired,
  unit: PropTypes.shape({
    id: PropTypes.number,
    unitName: PropTypes.string,
    description: PropTypes.string,
  }),
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
  to: PropTypes.string,
  lastPercentile: PropTypes.shape({
    items: PropTypes.array,
    visualTokenBackground: PropTypes.string,
  }).isRequired,
};
