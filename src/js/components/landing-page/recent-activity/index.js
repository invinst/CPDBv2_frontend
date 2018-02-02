import React, { Component, PropTypes } from 'react';
import Carousel from 'components/common/carousel';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';

export default class RecentActivity extends Component {

  componentDidMount() {
    this.props.requestActivityGrid();
  }

  render() {
    let { cards } = this.props;
    const recentActivityText = (
      <div>
        The officers, pairings, and units we display here are based on what other guests are
        searching on cpdp in addition to officers who are mentioned in conversation with our twitter bot,
        <a href='#'>@cpdpbot</a>
      </div>
    );

    const renderSlide = function (item) {
      return (
        <OfficerCard
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
      );
    };

    return (
      <div className='test--recent-activity'>
        <Carousel
          header='Recent Activity'
          description={ recentActivityText }
          data={ cards }
          renderSlideFunc={ renderSlide }
        />
      </div>
    );
  }
}

RecentActivity.propTypes = {
  cards: PropTypes.array,
  requestActivityGrid: PropTypes.func
};
