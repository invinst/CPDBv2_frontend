import React, { Component, PropTypes } from 'react';

import Carousel from 'components/common/carousel';
import EditModeProvider from 'components/edit-mode-provider';
import InlineHeaderSection from './inline-header-section';
import { headerWrapperStyle, carouselStyle, itemStyle } from './carousel-wrapper.style';
import * as GATracking from 'utils/google_analytics_tracking';


export default function withCarousel(
  CardComponent, type = '', extraCardAttr = {}, itemWidth = 232
) {
  class Wrapper extends Component {
    handleNavigate(direction) {
      GATracking.trackSwipeLanddingPageCarousel(direction, type.key || type);
    }

    render() {
      const { cards, editWrapperStateProps, pathname, openCardInNewPage, onTrackingAttachment } = this.props;

      const slideElements = cards.map((card, index) => {
        return (
          <div
            key={ index }
            style={ itemStyle(itemWidth) }
            className='test--carousel--item'>
            <CardComponent
              { ...card }
              { ...extraCardAttr }
              openCardInNewPage={ openCardInNewPage }
              pathname={ pathname }
              onTrackingAttachment={ onTrackingAttachment }
            />
          </div>
        );
      });

      return (
        <div className={ `test--landing-carousel-${(type.key || type).toLowerCase()}` }>
          <EditModeProvider
            pathname={ pathname }
            className='test--carousel--header'
            style={ headerWrapperStyle }>
            <InlineHeaderSection editWrapperStateProps={ editWrapperStateProps } type={ type }/>
          </EditModeProvider>
          <Carousel
            style={ carouselStyle }
            childWidth={ itemWidth }
            onNavigate={ this.handleNavigate.bind(this) }>
            { slideElements }
          </Carousel>
        </div>
      );
    }
  }

  Wrapper.propTypes = {
    cards: PropTypes.array,
    pathname: PropTypes.string,
    editWrapperStateProps: PropTypes.object,
    openCardInNewPage: PropTypes.bool,
    onTrackingAttachment: PropTypes.func,
  };

  Wrapper.defaultProps = {
    openCardInNewPage: false
  };

  return Wrapper;
}
