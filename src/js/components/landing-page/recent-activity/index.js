import React, { Component, PropTypes } from 'react';

import Carousel from 'components/common/carousel';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';
import InlineEditHeader from 'components/common/carousel/inline-header-section';

export default class RecentActivity extends Component {

  componentDidMount() {
    this.props.requestActivityGrid();
  }

  render() {
    let { cards, editWrapperStateProps } = this.props;
    const slideWidth = 232;
    const slideComponents = cards.map((item) => (
      <div key={ item.id } style={ { width: `${slideWidth}px` } }>
        <OfficerCard
          key={ item.id }
          officerId={ item.id }
          fullName={ item.fullName }
          visualTokenBackgroundColor={ item.visualTokenBackgroundColor }
          cardStyle={ { width: '232px', margin: 0 } }
          complaintCount={ item.complaintCount }
          sustainedCount={ item.sustainedCount }
          complaintPercentile={ item.complaintPercentile }
          birthYear={ item.birthYear }
          race={ item.race }
          gender={ item.gender }
          visualTokenStyle={ { height: '100px' } }
        />
      </div>
    ));

    return (
      <div className='test--recent-activity'>
        <Carousel
          headerSection={
            <InlineEditHeader editWrapperStateProps={ editWrapperStateProps } type='activity'/>
          }
        >
          { slideComponents }
        </Carousel>
      </div>
    );
  }
}

RecentActivity.propTypes = {
  cards: PropTypes.array,
  requestActivityGrid: PropTypes.func,
  editWrapperStateProps: PropTypes.object
};
