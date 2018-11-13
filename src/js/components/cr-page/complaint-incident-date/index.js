import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import styles from './complaint-incident-date.sass';


export default class ComplaintIncidentDate extends Component {
  render() {
    const { incidentDate } = this.props;
    if (!incidentDate) return null;

    return (
      <div className={ styles.complaintIncidentDate }>
        <div className='cr-incident-date-label'>DATE</div>
        <div className='cr-incident-date-value'>
          { moment(incidentDate).format('ll') }
        </div>
      </div>
    );
  }
}

ComplaintIncidentDate.propTypes = {
  incidentDate: PropTypes.string,
};
