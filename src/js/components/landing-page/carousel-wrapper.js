import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';

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
      const { className, cards, editWrapperStateProps, pathname, openCardInNewPage } = this.props;

      const slideElements = cards.map((card, index) => {
        return (
          <div
            key={ index }
            style={ itemStyle(itemWidth) }
            className='test--carousel--item'>
            <CardComponent
              { ...omit(card, 'id') }
              { ...extraCardAttr }
              openCardInNewPage={ openCardInNewPage }
              pathname={ pathname }
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
    className: PropTypes.string
  };

  Wrapper.defaultProps = {
    openCardInNewPage: false
  };

  return Wrapper;
}
