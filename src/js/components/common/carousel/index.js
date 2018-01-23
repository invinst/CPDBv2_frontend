import React, { Component, PropTypes } from 'react';
import Swiper from 'react-id-swiper';

import OfficerCard from 'components/landing-page/activity-grid/officer-card.js';
import {
  wrapperStyle,
  maxSlideWidth,
  spaceSlideWidth,
  slideWidth,
  headerSectionWidth,
  headerWrapperStyle,
  headerStyle,
  headerTextStyle,
  mainSliderStyle,
  carouselWrapperStyle,
  innerSlideCarouselStyle
} from './carousel.style';
import { arrowWrapperWidth } from './carousel-arrow.style' ;
import Arrow from './carousel-arrow';


class Carousel extends Component {
  constructor(props) {
    super(props);
    this.updateNumVisibleSlide = this.updateNumVisibleSlide.bind(this);
    this.clickHandler = this.clickHandler.bind(this);

    const defaultNumVisibleSlides = Math.floor(
      (window.innerWidth - headerSectionWidth - arrowWrapperWidth) / maxSlideWidth
    );
    this.setting = {
      initialSlide: 0,
      spaceBetween: spaceSlideWidth,
      slidesPerView: 'auto',
      slidesOffsetAfter: arrowWrapperWidth * 2 + 10
    };
    this._hasEventRegistered = false;
    this._isMounted = false;
    this.state = {
      numVisibleSlide: defaultNumVisibleSlides,
      displayLeftArrow: false,
      displayRightArrow: (props.data ? props.data.length : 0) > defaultNumVisibleSlides
    };
  }

  componentDidMount() {
    this._registerSwiperEvent();
    window.addEventListener('resize', this.updateNumVisibleSlide);
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    const lenData = this.props.data ? this.props.data.length : 0;
    const nextLenData = nextProps.data ? nextProps.data.length : 0;
    if (lenData !== nextLenData) {
      this.setState({
        ...this.state,
        displayRightArrow: nextLenData > this.state.numVisibleSlide
      });
    }
  }

  componentDidUpdate() {
    this._registerSwiperEvent();
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.updateNumVisibleSlide);
    this._isMounted = false;
  }

  updateNumVisibleSlide() {
    const newNumVisibleSlide = Math.floor((window.innerWidth - headerSectionWidth - arrowWrapperWidth) / maxSlideWidth);

    if (this._isMounted && newNumVisibleSlide !== this.state.numVisibleSlide) {
      this.setState({
        ...this.state,
        numVisibleSlide: newNumVisibleSlide
      });
    }
  }

  _registerSwiperEvent() {
    if (this.swiper && !this._hasEventRegistered) {
      this._hasEventRegistered = true;
      this.swiper.on('slideChangeTransitionStart', function () {
        if (this.activeIndex !== 0)
          this.setTranslate(this.translate + arrowWrapperWidth + spaceSlideWidth);
      });

      this.swiper.on('slideChange', (a, b) => {
        const displayLeftArrow = this.swiper.activeIndex !== 0;
        const displayRightArrow = this.swiper.slides.length - this.swiper.activeIndex - 1 > this.state.numVisibleSlide;
        this.setState({
          ...this.state,
          displayLeftArrow: displayLeftArrow,
          displayRightArrow: displayRightArrow
        });
      });
    }
  }

  clickHandler(direction) {
    const { data } = this.props;
    let nextSlide;
    if (direction === 'left') {
      nextSlide = Math.max(this.swiper.activeIndex - this.state.numVisibleSlide, 0);
    } else if (direction === 'right') {
      nextSlide = Math.min(
        this.swiper.activeIndex + this.state.numVisibleSlide,
        data.length - this.state.numVisibleSlide
      );
    }
    this.swiper.slideTo(nextSlide);
  }

  render() {
    const { header, description, data } = this.props;
    return (typeof data !== 'undefined' && data.length > 0) ? (
      <div style={ wrapperStyle }>
        <div className='test--carousel--wrapper' style={ carouselWrapperStyle }>
          { this.state.displayLeftArrow && (
            <Arrow side='left' clickHandler={ this.clickHandler }/>
          ) }
          <div style={ { ...mainSliderStyle } }>
            <Swiper { ...this.setting } ref={ node => {
              if (node) this.swiper = node.swiper;
            } }>
              {
                data.map((officer) => (
                  <div className='test--carousel--item' key={ officer.id } style={ { width: `${slideWidth}px` } }>
                    <OfficerCard
                      officerId={ officer.id }
                      fullName={ officer.fullName }
                      visualTokenBackgroundColor={ officer.visualTokenBackgroundColor }
                      visualTokenStyle={ { height: '100px' } }
                      cardStyle={ innerSlideCarouselStyle }
                      complaintCount={ officer.complaintCount }
                      sustainedCount={ officer.sustainedCount }
                      complaintPercentile={ officer.complaintPercentile }
                      birthYear={ officer.birthYear }
                      race={ officer.race }
                      gender={ officer.gender }
                    />
                  </div>
                ))
              }
            </Swiper>
          </div>
          { this.state.displayRightArrow && (
            <Arrow side='right' clickHandler={ this.clickHandler }/>
          ) }
        </div>
        <div className='test--carousel--header' style={ headerWrapperStyle }>
          <h3 style={ headerStyle }>{ header }</h3>
          <div style={ headerTextStyle }>
            { description }
          </div>
        </div>
      </div>
    ) : <div/>;
  }
}

Carousel.propTypes = {
  header: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  data: PropTypes.array
};

export default Carousel;
