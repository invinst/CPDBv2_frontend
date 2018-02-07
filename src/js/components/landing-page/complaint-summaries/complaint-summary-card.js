import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
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
    const { hovering, summary, closedDate, category, crid } = this.props;
    return (
      <div style={ complaintSummaryCardStyle(hovering) }>
        <Link
          style={ { textDecoration: 'none' } }
          to={ `/complaint/${crid}/` }
          className='test--complaint-summary-card'
        >
          <div style={ titleWrapperStyle }>
            <div style={ dateStyle(hovering) }>{ moment(closedDate).format('ll') }</div>
            <div style={ categoryStyle(hovering) }>{ category }</div>
          </div>
          <div style={ summaryWrapperStyle(hovering) }>
            <div style={ contentStyle(hovering) }>
              { summary }
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
  closedDate: PropTypes.instanceOf(Date),
  category: PropTypes.string,
  hovering: PropTypes.bool
};

export default Hoverable(ComplaintSummaryCard);
