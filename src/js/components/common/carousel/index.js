import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isEqual, debounce } from 'lodash';

import Arrow, { arrowWidth } from './arrow';
import Swiper from 'components/common/swiper';
import styles from './carousel.sass';
import { SLIDE_PER_WHEEL } from 'utils/constants';


export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      displayRightArrow: true,
      displayLeftArrow: false,
      prevChildren: props.children,
    };
    this.navigateOnWheel = debounce(this.navigateOnWheel, 200, { leading: true, trailing: false, maxWait: 1500 });
  }

  static getDerivedStateFromProps(props, state) {
    const { children, resetPosition } = props;
    const { prevChildren } = state;
    if (
      prevChildren.length > children.length ||
      !isEqual(prevChildren, children.slice(0, prevChildren.length))
    ) {
      if (resetPosition) {
        return { slideIndex: 0, prevChildren: children };
      }
    }
    return { prevChildren: children };
  }

  componentDidMount() {
    this.updateSlidesPerGroup();
    this.el && this.el.addEventListener('mousewheel', this.onWheel, { passive: false });
  }

  componentDidUpdate() {
    this.updateSlidesPerGroup();
  }

  updateSlidesPerGroup() {
    const { spaceBetween, childWidth } = this.props;
    const slideWidth = childWidth + spaceBetween;
    const { width } = this.el.getBoundingClientRect();
    this.slidesPerGroup = Math.max(Math.floor((width - arrowWidth) / slideWidth), 1);
  }

  handleNavigate = (direction, customSlidesPerGroup) => {
    const { slideIndex, displayLeftArrow, displayRightArrow } = this.state;
    if (direction === 'right') {
      if (displayRightArrow) {
        this.slideTo(slideIndex + (customSlidesPerGroup || this.slidesPerGroup));
      }
    } else {
      if (displayLeftArrow) {
        this.slideTo(slideIndex - (customSlidesPerGroup || this.slidesPerGroup));
      }
    }
  };

  handleSlideNext = () => {
    const { onNavigate } = this.props;
    onNavigate('right');
  };

  handleSlidePrev = () => {
    const { onNavigate } = this.props;
    onNavigate('left');
  };

  loadMore() {
    const { hasMore, loadMore } = this.props;
    hasMore && loadMore();
  }

  slideTo(slideIndex) {
    const { children, threshold } = this.props;
    if (children.length - slideIndex <= threshold) {
      this.loadMore();
    }
    this.setState({ slideIndex });
  }

  onSnapIndexChange = ({ isEnd, isBeginning, activeIndex }) => {
    isEnd && this.loadMore();

    this.setState({
      slideIndex: isEnd ? this.state.slideIndex : activeIndex,
      displayLeftArrow: !isBeginning,
      displayRightArrow: !isEnd,
    });
  };

  updateArrows = ({ isEnd, isBeginning }) => {
    isEnd && this.loadMore();

    this.setState({
      displayLeftArrow: !isBeginning,
      displayRightArrow: !isEnd,
    });
  };

  navigateOnWheel = (e) => {
    if (e.deltaX > 0) {
      this.handleNavigate('right', SLIDE_PER_WHEEL);
    }
    else {
      this.handleNavigate('left', SLIDE_PER_WHEEL);
    }
  };

  onWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      this.navigateOnWheel(e);
    }
  };

  render() {
    const { children, style, spaceBetween, arrowClassName } = this.props;
    const { displayLeftArrow, displayRightArrow, slideIndex } = this.state;

    return (
      <div className={ styles.carousel } ref={ el => this.el = el } style={ { ...style.wrapper } }>
        <Swiper
          spaceBetween={ spaceBetween }
          beforeOffsetAtMiddle={ 40 }
          onSnapIndexChange={ this.onSnapIndexChange }
          slideNextTransitionStart={ this.handleSlideNext }
          slidePrevTransitionStart={ this.handleSlidePrev }
          onUpdate={ this.updateArrows }
          slideIndex={ slideIndex }>
          { children }
        </Swiper>
        <Arrow
          style={ style.navigationButton }
          className={ arrowClassName }
          direction='right'
          show={ displayRightArrow }
          onClick={ this.handleNavigate }/>
        <Arrow
          style={ style.navigationButton }
          className={ arrowClassName }
          direction='left'
          show={ displayLeftArrow }
          onClick={ this.handleNavigate }/>
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node,
  onNavigate: PropTypes.func,
  childWidth: PropTypes.number,
  style: PropTypes.object,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  threshold: PropTypes.number,
  spaceBetween: PropTypes.number,
  arrowClassName: PropTypes.string,
  resetPosition: PropTypes.bool,
};

Carousel.defaultProps = {
  threshold: 10,
  spaceBetween: 8,
  style: {},
  loadMore: () => {},
  onNavigate: () => {},
  resetPosition: true,
};
