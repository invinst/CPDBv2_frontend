import React, { Component, PropTypes } from 'react';
import Carousel from 'components/common/carousel';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';

export default class OfficersByAllegation extends Component {

  componentDidMount() {
    this.props.requestOfficersByAllegation();
  }

  render() {
    let { cards } = this.props;
    const officerByAllegationText = (
      <div>
        These are the officers with the most allegations of misconduct in Chicago.
      </div>
    );
    const slideComponents = cards.map((item) => (
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
    ));

    return (
      <div className='test--officers-by-allegation'>
        <Carousel
          header='Officers by Allegation'
          description={ officerByAllegationText }
          slides={ slideComponents }
        />
      </div>
    );
  }
}

OfficersByAllegation.propTypes = {
  cards: PropTypes.array,
  requestOfficersByAllegation: PropTypes.func
};
