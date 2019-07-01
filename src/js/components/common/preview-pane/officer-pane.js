import React, { Component, PropTypes } from 'react';
import { isNil } from 'lodash';

import WidgetWrapper, {
  VisualTokenWidget,
  OfficerInfoWidget,
  MetricWidget,
} from './widgets';


export default class OfficerPane extends Component {
  render() {
    const {
      fullName,
      age,
      appointedDate,
      resignationDate,
      unit,
      rank,
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
      yScrollable,
    } = this.props;

    const formatValue = (value) => isNil(value) ? 'N/A' : value;
    const metrics = [
      {
        name: 'Allegations',
        value: formatValue(complaintCount),
        description: complaintPercentile > 0 ? `More than ${complaintPercentile}% of other officers` : '',
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
        description: trrPercentile > 0 ? `More than ${trrPercentile}% of other officers` : '',
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
        description: honorableMentionPercentile > 0 ? `More than ${honorableMentionPercentile}% of other officers` : '',
      },
    ];
    return (
      <WidgetWrapper callToAction={ { to, text: 'View Officer Profile' } } yScrollable={ yScrollable }>
        <VisualTokenWidget { ...lastPercentile }/>
        <OfficerInfoWidget
          fullName={ fullName }
          appointedDate={ appointedDate }
          resignationDate={ resignationDate }
          age={ age }
          unit={ unit }
          rank={ rank }
          badge={ badge }
          race={ race }
          gender={ gender }
        />
        <MetricWidget metrics={ metrics }/>
      </WidgetWrapper>
    );
  }
}

OfficerPane.propTypes = {
  fullName: PropTypes.string,
  age: PropTypes.number,
  appointedDate: PropTypes.string,
  resignationDate: PropTypes.string,
  unit: PropTypes.shape({
    id: PropTypes.number,
    unitName: PropTypes.string,
    description: PropTypes.string,
  }),
  rank: PropTypes.string,
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
  yScrollable: PropTypes.bool,
};

OfficerPane.defaultProps = {
  yScrollable: false,
};
