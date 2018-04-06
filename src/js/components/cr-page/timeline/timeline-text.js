import React, { PropTypes, Component } from 'react';
import { concat, get, toPairs } from 'lodash';
import moment from 'moment';

import { dateStyle, eventStyle, wrapperStyle } from './timeline-text.style';


export default class TimelineText extends Component {
  render() {
    const { startDate, endDate, incidentDate } = this.props;
    const dates = {};
    dates[incidentDate] = concat(get(dates, incidentDate, []), 'Incident Occurs');
    dates[startDate] = concat(get(dates, startDate, []), 'Complaint Filed');
    dates[endDate] = concat(get(dates, endDate, []), 'Investigation Closed');
    return (
      <div style={ wrapperStyle }>
        {
          toPairs(dates).map(([date, events], ind) =>
            <div key={ ind } style={ dateStyle }>
              { date
                  ? <div>{ moment(date).format('ll') }</div>
                  : null
              }
              {
                events.map((event, ind2) =>
                  <div key={ ind2 } style={ eventStyle }>{ event }</div>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

TimelineText.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  incidentDate: PropTypes.string
};

TimelineText.defaultProps = {
  startDate: '',
  endDate: '',
  incidentDate: ''
};
