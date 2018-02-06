import React, { Component, PropTypes } from 'react';
import Swiper from 'react-id-swiper';

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
      displayRightArrow: (props.slides ? props.slides.length : 0) > defaultNumVisibleSlides
    };
  }

  componentDidMount() {
    this._registerSwiperEvent();
    window.addEventListener('resize', this.updateNumVisibleSlide);
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    const lenData = this.props.slides ? this.props.slides.length : 0;
    const nextLenData = nextProps.slides ? nextProps.slides.length : 0;
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
    window.removeEventListener('resize', this.updateNumVisibleSlide);
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
    const { slides } = this.props;
    let nextSlide;
    if (direction === 'left') {
      nextSlide = Math.max(this.swiper.activeIndex - this.state.numVisibleSlide, 0);
    } else if (direction === 'right') {
      nextSlide = Math.min(
        this.swiper.activeIndex + this.state.numVisibleSlide,
        slides.length - this.state.numVisibleSlide
      );
    }
    this.swiper.slideTo(nextSlide);
  }

  render() {
    const { header, description, slides, slideWidth } = this.props;
    return (typeof slides !== 'undefined' && slides.length > 0) ? (
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
                slides.map((slide, idx) => (
                  <div
                    className='test--carousel--item'
                    key={ `item-${idx}` }
                    style={ { width: `${slideWidth}px` } }
                  >
                    { slide }
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

Carousel.defaultProps = {
  slideWidth: slideWidth
};

Carousel.propTypes = {
  header: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  slides: PropTypes.array,
  slideWidth: PropTypes.number
};

export default Carousel;
