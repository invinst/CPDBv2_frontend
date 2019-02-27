import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import moment from 'moment';
import _ from 'lodash';

import styles from './complaint-summary-card.sass';

export default class ComplaintSummaryCard extends React.Component {
  render() {
    const { summary, incidentDate, categoryNames, crid } = this.props;

    const categories = _.join(categoryNames, ', ');

    return (
      <Link
        to={ `/complaint/${crid}/` }
        className={ styles.complaintSummaryCard }
      >
        <div className='complaint-summary-card-title'>
          <div className='complaint-summary-card-title-date'>
            { moment(incidentDate, 'YYYY-MM-DD').format('ll') }
          </div>
          <div className='complaint-summary-card-title-category'>{ categories }</div>
        </div>
        <div className='complaint-summary-card-summary'>
          { _.truncate(summary, { 'length': 280, 'separator': ' ' }) }
        </div>
      </Link>
    );
  }
}

ComplaintSummaryCard.propTypes = {
  crid: PropTypes.string,
  summary: PropTypes.string,
  incidentDate: PropTypes.string,
  categoryNames: PropTypes.array,
};
