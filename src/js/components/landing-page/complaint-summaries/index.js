import React, { Component } from 'react';
import ComplaintSummaryCard from './complaint-summary-card';
import Carousel from 'components/common/carousel';
import { ComplaintSummaryFactory } from 'utils/test/factories/complaint';


export default class ComplaintSummaries extends Component {
  render() {
    // TODO: will embed reading data when complaint summary is ready
    const cards = ComplaintSummaryFactory.buildList(20);

    const dummyDocuments = cards.map((card, idx) => {
      return (
        <ComplaintSummaryCard
          key={ idx }
          { ...card }
        />
      );
    });

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
          slides={ dummyDocuments }
        />
      </div>
    );
  }
}



