import React, { Component, PropTypes } from 'react';
import ComplaintSummaryCard from './complaint-summary-card';
import Carousel from 'components/common/carousel';


export default class ComplaintSummaries extends Component {

  componentDidMount() {
    this.props.getComplaintSummaries();
  }

  render() {
    const { cards } = this.props;

    const complaintSummaries = cards.map((card, idx) => {
      return <ComplaintSummaryCard key={ idx } { ...card } />;
    });

    const descriptionText = (
      <div>
        <p>We often update our complaint records as we recieve more information from the City.</p>
        <p>Here are some of the recent updates.</p>
      </div>
    );

    return (cards && cards.length > 0) && (
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
  cards: PropTypes.array,
  getComplaintSummaries: PropTypes.func
};

