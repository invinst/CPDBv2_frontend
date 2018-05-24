import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';

import Carousel from 'components/common/carousel';
import EditModeProvider from 'components/edit-mode-provider';
import InlineHeaderSection from './inline-header-section';
import { headerWrapperStyle, wrapperStyle, carouselStyle, itemStyle } from './carousel-wrapper.style';


export default function withCarousel(
  CardComponent, type = '', extraCardAttr = {}, itemWidth = 232
) {
  class Wrapper extends Component {
    handleNavigate(direction) {
      global.ga('send', 'event', 'landing_page_carousel', `swipe_${direction}`, type.key || type);
    }

    render() {
      const { cards, editWrapperStateProps, pathname } = this.props;

      const slideElements = cards.map((card, index) => {
        return (
          <div
            key={ index }
            style={ itemStyle(itemWidth) }
            className='test--carousel--item'>
            <CardComponent { ...omit(card, 'id') } { ...extraCardAttr } />
          </div>
        );
      });

      return (
        <div
          className={ `test--landing-carousel-${(type.key || type).toLowerCase()}` }
          style={ wrapperStyle }>
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
    editWrapperStateProps: PropTypes.object
  };

  return Wrapper;
}


