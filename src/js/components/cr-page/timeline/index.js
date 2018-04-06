import React, { Component, PropTypes } from 'react';

import { wrapperStyle, titleStyle } from './timeline.style';
import CirclesSVG from './circles-svg';
import TimelineText from './timeline-text';


export default class Timeline extends Component {
  renderTimeline() {
    const { startDate, endDate, incidentDate } = this.props;

    return (
      <div>
        <CirclesSVG
          startDate={ startDate }
          endDate={ endDate }
          incidentDate={ incidentDate }/>
        <TimelineText
          startDate={ startDate }
          endDate={ endDate }
          incidentDate={ incidentDate }/>
      </div>
    );
  }

  render() {
    return (
      <div style={ wrapperStyle }>
        <div style={ titleStyle }>INVESTIGATION TIMELINE</div>
        { this.renderTimeline() }
      </div>
    );
  }
}

Timeline.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  incidentDate: PropTypes.string
};
