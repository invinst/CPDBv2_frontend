import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';

import { CAROUSEL_TYPES, ACTIVITY_GRID_CARD_TYPES } from 'utils/constants';
import OfficerCard from 'components/landing-page/common/officer-card';
import PairingCard from 'components/landing-page/common/pairing-card';
import Carousel from 'components/common/carousel';
import EditModeProvider from 'components/edit-mode-provider';
import InlineHeaderSection from '../inline-header-section';
import { headerWrapperStyle, carouselStyle, itemStyle } from '../carousel-wrapper.style';


export default class RecentActivity extends Component {
  handleNavigate(direction) {
    global.ga('send', 'event', 'landing_page_carousel', `swipe_${direction}`, CAROUSEL_TYPES.ACTIVITY.key);
  }

  render() {
    const { cards, editWrapperStateProps, pathname } = this.props;

    const slideElements = cards.map((card, index) => {
      let itemWidth;
      if (card.type === ACTIVITY_GRID_CARD_TYPES.OFFICER) {
        itemWidth = 232;
      } else if (card.type === ACTIVITY_GRID_CARD_TYPES.PAIR) {
        itemWidth = 464;
      }
      return (
        <div
          key={ index }
          style={ itemStyle(itemWidth) }
          className='test--carousel--item'>
          {
            card.type === ACTIVITY_GRID_CARD_TYPES.OFFICER ? (
              <OfficerCard
                { ...omit(card, 'id') }
                cardStyle={ { width: '232px', margin: 0 } }
                visualTokenStyle={ { height: '100px' } }
              />
            ) : card.type === ACTIVITY_GRID_CARD_TYPES.PAIR ? (
              <PairingCard
                { ...card }
              />
            ) : null
          }
        </div>
      );
    });

    return (
      <div
        className={ `test--landing-carousel-${(CAROUSEL_TYPES.ACTIVITY.key).toLowerCase()}` }>
        <EditModeProvider
          pathname={ pathname }
          className='test--carousel--header'
          style={ headerWrapperStyle }>
          <InlineHeaderSection editWrapperStateProps={ editWrapperStateProps } type={ CAROUSEL_TYPES.ACTIVITY } />
        </EditModeProvider>
        <Carousel
          style={ carouselStyle }
          childWidth={ 232 }
          onNavigate={ this.handleNavigate.bind(this) }>
          { slideElements }
        </Carousel>
      </div>
    );
  }
}

RecentActivity.propTypes = {
  cards: PropTypes.array,
  pathname: PropTypes.string,
  editWrapperStateProps: PropTypes.object
};
