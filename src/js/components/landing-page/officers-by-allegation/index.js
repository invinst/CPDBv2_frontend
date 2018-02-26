import React, { Component, PropTypes } from 'react';

import Carousel from 'components/common/carousel';
import InlineEditHeader from 'components/common/carousel/inline-header-section';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';


export default class OfficersByAllegation extends Component {

  componentDidMount() {
    this.props.requestOfficersByAllegation();
  }

  render() {
    let { cards, editWrapperStateProps } = this.props;
    const slideWidth = 232;
    const slideComponents = cards.map((item) => (
      <div key={ item.id } style={ { width: `${slideWidth}px` } }>
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
      </div>
    ));

    return (
      <div className='test--officers-by-allegation'>
        <Carousel
          headerSection={
            <InlineEditHeader editWrapperStateProps={ editWrapperStateProps } type='allegation'/>
          }
        >
          { slideComponents }
        </Carousel>

      </div>
    );
  }
}

OfficersByAllegation.propTypes = {
  cards: PropTypes.array,
  requestOfficersByAllegation: PropTypes.func,
  editWrapperStateProps: PropTypes.object
};
