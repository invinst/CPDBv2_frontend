import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Carousel from 'components/common/carousel';
import EditModeProvider from 'components/edit-mode-provider';
import InlineHeaderSection from './inline-header-section';
import { headerWrapperStyle, carouselStyle, itemStyle } from './carousel-wrapper.style';
import * as tracking from 'utils/tracking';


export default function withCarousel(
  CardComponentMap, type = '', extraCardAttr = {}
) {
  class Wrapper extends Component {
    handleNavigate = (direction) => {
      tracking.trackSwipeLandingPageCarousel(direction, type.key || type);
    };

    render() {
      const {
        className, cards, editWrapperStateProps,
        pathname, openCardInNewPage, onTrackingAttachment,
        addOrRemoveItemInPinboard, pinnable,
      } = this.props;

      const slideElements = cards.map((card, index) => {
        const { CardComponent, itemWidth } = CardComponentMap[card.kind || type];
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
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
              pinnable={ pinnable }
            />
          </div>
        );
      });

      return (
        <div className={ `test--landing-carousel-${(type.key || type).toLowerCase()} ${className}` }>
          <EditModeProvider
            pathname={ pathname }
            className='test--carousel--header'
            style={ headerWrapperStyle }>
            <InlineHeaderSection editWrapperStateProps={ editWrapperStateProps } type={ type }/>
          </EditModeProvider>
          <Carousel
            style={ carouselStyle }
            childWidth={ 232 }
            onNavigate={ this.handleNavigate }
            resetPosition={ false }
          >
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
    addOrRemoveItemInPinboard: PropTypes.func,
    className: PropTypes.string,
    pinnable: PropTypes.bool,
  };

  Wrapper.defaultProps = {
    openCardInNewPage: false,
    pinnable: true,
  };

  return Wrapper;
}
