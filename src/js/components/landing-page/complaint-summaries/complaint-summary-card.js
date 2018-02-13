import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import moment from 'moment';
import _ from 'lodash';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  complaintSummaryCardStyle,
  categoryStyle,
  contentStyle,
  dateStyle,
  summaryWrapperStyle,
  titleWrapperStyle
} from './complaint-summary-card.style';

class ComplaintSummaryCard extends React.Component {
  render() {
    const { hovering, summary, incidentDate, categoryNames, crid } = this.props;

    const categories = _.join(categoryNames, ', ');

    return (
      <div style={ complaintSummaryCardStyle(hovering) }>
        <Link
          style={ { textDecoration: 'none' } }
          to={ `/complaint/${crid}/` }
          className='test--complaint-summary-card'
        >
          <div style={ titleWrapperStyle }>
            <div style={ dateStyle(hovering) }>{ moment(incidentDate, 'YYYY-MM-DD').format('ll') }</div>
            <div style={ categoryStyle(hovering) }>{ categories }</div>
          </div>
          <div style={ summaryWrapperStyle(hovering) }>
            <div style={ contentStyle(hovering) }>
              { _.truncate(summary, { 'length': 280, 'separator': ' ' }) }
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

ComplaintSummaryCard.propTypes = {
  crid: PropTypes.string,
  summary: PropTypes.string,
  incidentDate: PropTypes.string,
  categoryNames: PropTypes.array,
  hovering: PropTypes.bool
};

export default Hoverable(ComplaintSummaryCard);
