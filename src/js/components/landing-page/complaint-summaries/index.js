import React, { Component } from 'react';
import ComplaintSummaryCard from './complaint-summary-card';
import Carousel from 'components/common/carousel';
import _ from 'lodash';

// import Carousel from 'components/common/carousel';
// import OfficerCard from 'components/landing-page/activity-grid/officer-card';

export default class ComplaintSummaries extends Component {

  componentDidMount() {

  }

  render() {

    const dummyDocuments = _.range(6).map((idx) => {
      return (
        <ComplaintSummaryCard key={ idx }/>
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



