import React, { Component, PropTypes } from 'react';

import ComplaintSummaryCard from './complaint-summary-card';
import Carousel from 'components/common/carousel';
import HeaderSection from 'components/common/carousel/inline-header-section';


export default class ComplaintSummaries extends Component {

  componentDidMount() {
    this.props.getComplaintSummaries();
  }

  render() {
    const { cards, editWrapperStateProps } = this.props;

    const slideWidth = 232; // TODO: change to constant

    const complaintSummaries = cards.map((card, idx) => (
      <div key={ idx } style={ { width: `${slideWidth}px` } }>
        <ComplaintSummaryCard { ...card } />
      </div>
    ));

    return (cards && cards.length > 0) && (
      <div className='test--complaint-summaries'>
        <Carousel headerSection={
          <HeaderSection editWrapperStateProps={ editWrapperStateProps } type='complaint'/>
        } >
          { complaintSummaries }
        </Carousel>
      </div>
    );
  }
}

ComplaintSummaries.propTypes = {
  cards: PropTypes.array,
  getComplaintSummaries: PropTypes.func,
  editWrapperStateProps: PropTypes.object
};

