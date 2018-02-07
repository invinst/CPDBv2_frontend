import React, { Component, PropTypes } from 'react';
import ComplaintSummaryCard from './complaint-summary-card';
import Carousel from 'components/common/carousel';


export default class ComplaintSummaries extends Component {
  render() {
    const { cards } = this.props;

    const complaintSummaries = cards.map((card, idx) => {
      return <ComplaintSummaryCard key={ idx } { ...card } />;
    }); // temporary

    const descriptionText = (
      <div>
        <p>We often update our complaint records as we recieve more information from the City.</p>
        <p>Here are some of the recent updates.</p>
      </div>
    );

    return (
      <div className='test--complaint-summaries'>
        <Carousel
          header='Complaint Summaries'
          description={ descriptionText }
          slides={ complaintSummaries }
        />
      </div>
    );
  }
}

ComplaintSummaries.propTypes = {
  cards: PropTypes.array
};

