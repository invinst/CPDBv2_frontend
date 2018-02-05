import React from 'react';
import {
  complaintSummaryCardStyle,
  categoryStyle,
  contentStyle,
  dateStyle,
  summaryWrapperStyle,
  titleWrapperStyle
} from './complaint-summary-card.style';


export default class ComplaintSummaryCard extends React.Component {
  render() {
    return (
      <div style={ complaintSummaryCardStyle }>
        <div style={ titleWrapperStyle }>
          <div style={ dateStyle }>13 Jun 2017</div>
          <div style={ categoryStyle }>Use of Force</div>
        </div>

        <div style={ summaryWrapperStyle }>
          <div style={ contentStyle }>
            In an incident involving an off-duty CPD Officer/father and the Complainant/daughter, it was alleged that
            the Officer/father slapped the Complainant/daughter about the
            face.
          </div>
        </div>
      </div>
    );
  }
}
