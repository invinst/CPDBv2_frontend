import React, { PropTypes, Component } from 'react';
import { concat, get, toPairs } from 'lodash';
import moment from 'moment';
import cx from 'classnames';

import styles from './timeline-text.sass';


export default class TimelineText extends Component {
  render() {
    const { startDate, endDate, incidentDate } = this.props;
    const dates = {};
    dates[incidentDate] = concat(get(dates, incidentDate, []), 'Incident Occurs');
    dates[startDate] = concat(get(dates, startDate, []), 'Complaint Filed');
    dates[endDate] = concat(get(dates, endDate, []), 'Investigation Closed');
    return (
      <div className={ cx(styles.timelineText, 'investigator-timeline-text') }>
        {
          toPairs(dates).map(([date, events], ind) =>
            <div key={ ind } className='timeline-textblock'>
              { date
                ? <div>{ moment(date).format('ll') }</div>
                : null
              }
              {
                events.map((event, ind2) =>
                  <div key={ ind2 } className='timeline-event'>{ event }</div>
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
  incidentDate: PropTypes.string,
};

TimelineText.defaultProps = {
  startDate: '',
  endDate: '',
  incidentDate: '',
};
