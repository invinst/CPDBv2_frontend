import React, { Component, PropTypes } from 'react';
import { map, filter } from 'lodash';
import moment from 'moment';

import { softGreyColor, altoColor, mediumGrayColor, hardBlackColor } from 'utils/styles';
import { wrapperStyle, titleStyle, dateStyle, eventStyle } from './timeline.style';

const milestoneDistance = 75;

export default class Timeline extends Component {
  getTimeLine() {
    const { startDate, endDate, incidentDate } = this.props;

    const result = [];
    result.push({ date: incidentDate, events: ['Incident Occurs'] });
    if (startDate && startDate === incidentDate) {
      filter(result, obj => obj.date === incidentDate)[0].events.push('Investigation Begins');
    } else {
      result.push({ date: startDate, events: ['Investigation Begins'] });
    }

    if (endDate && endDate === startDate) {
      filter(result, obj => obj.date === startDate)[0].events.push('Investigation Closed');
    } else {
      result.push({ date: endDate, events: ['Investigation Closed'] });
    }

    return result;
  }

  computeLineHeight(timeline) {
    const numberOfMilestones = Object.keys(timeline).length;
    return milestoneDistance * (numberOfMilestones - 1);
  }

  renderTimelineCircles() {
    const timeline = this.getTimeLine();
    const lineHeight = this.computeLineHeight(timeline);
    const timelineCircleDisplayProps = [
      { key: '1', r: '7.5', cx: '9', strokeWidth: '3', stroke: softGreyColor, fill: 'white' },
      { key: '2', r: '3', cx: '9', fill: softGreyColor },
      { key: '3', r: '9', cx: '9', fill: softGreyColor }
    ];

    return (
      <g>
        <line x1='9' y1='1' x2='9' y2={ lineHeight } stroke={ altoColor } strokeWidth={ 2 } />
        {
          map(timeline, ({ events }, index) => {
            return map(events, event => {
              const props = timelineCircleDisplayProps.shift();
              return <circle { ...props } cy={ 9 + index * milestoneDistance } />;
            });
          })
        }
      </g>
    );
  }

  renderTimelineTexts() {
    const timeline = this.getTimeLine();

    return (
      <g>
        {
          map(timeline, ({ date, events }, index) => {
            const currentY = 14 + index * milestoneDistance;
            const dateText = !date ? null : (
              <text x='26' y={ currentY } className='date' style={ dateStyle } fill={ mediumGrayColor }>
                { moment(date).format('ll') }
              </text>
            );
            const eventTexts = map(events, (event, ind) => (
              <text
                x='26' y={ currentY + 16 * (ind + (date ? 1 : 0)) }
                style={ eventStyle } fill={ hardBlackColor }>
                { event }
              </text>
            ));
            return [dateText, ...eventTexts];
          })
        }
      </g>
    );
  }

  render() {
    const { endDate } = this.props;
    const timeline = this.getTimeLine();
    const lineHeight = this.computeLineHeight(timeline);
    const viewBoxHeight = 20 + 16 * (filter(timeline, obj => obj.date === endDate)[0].events.length) + lineHeight;

    return (
      <div style={ wrapperStyle }>
        <div style={ titleStyle }>INVESTIGATION TIMELINE</div>
        <svg x='0px' y='0px' viewBox={ `0 0 320 ${ viewBoxHeight }` }>
          { this.renderTimelineCircles() }
          { this.renderTimelineTexts() }
        </svg>
      </div>
    );
  }
}

Timeline.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  incidentDate: PropTypes.string
};
