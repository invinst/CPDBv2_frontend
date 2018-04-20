import React, { PropTypes, Component } from 'react';
import { isEqual } from 'lodash';

import Arrow, { arrowWidth } from './arrow';
import Swiper from 'components/common/swiper';
import { wrapperStyle } from './carousel.style';


export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      displayRightArrow: true,
      displayLeftArrow: false
    };
  }

  componentDidMount() {
    this.updateSlidesPerGroup();
  }

  componentWillReceiveProps(nextProps) {
    const { children } = this.props;
    if (children.length >= nextProps.children.length && !isEqual(children, nextProps.children)) {
      this.slideTo(0);
    }
  }

  componentDidUpdate() {
    this.updateSlidesPerGroup();
  }

  updateSlidesPerGroup() {
    const { spaceBetween, childWidth } = this.props;
    const slideWidth = childWidth + spaceBetween;
    const { width } = this.el.getBoundingClientRect();
    this.slidesPerGroup = Math.floor((width - arrowWidth) / slideWidth);
  }

  handleNavigate(direction) {
    const { slideIndex } = this.state;
    const { onNavigate } = this.props;
    if (direction === 'right') {
      this.slideTo(slideIndex + this.slidesPerGroup);
    } else {
      this.slideTo(slideIndex - this.slidesPerGroup);
    }
    onNavigate(direction);
  }

  slideTo(slideIndex) {
    const { loadMore, children, threshold, hasMore } = this.props;
    if (hasMore && children.length - slideIndex <= threshold) {
      loadMore();
    }
    this.setState({ slideIndex });
  }

  updateArrowsAndSlideIndex({ isEnd, isBeginning, activeIndex }) {
    this.setState({
      slideIndex: activeIndex,
      displayLeftArrow: !isBeginning,
      displayRightArrow: !isEnd
    });
  }

  updateArrows({ isEnd, isBeginning }) {
    this.setState({
      displayLeftArrow: !isBeginning,
      displayRightArrow: !isEnd
    });
  }

  render() {
    const { children, style, spaceBetween } = this.props;
    const { displayLeftArrow, displayRightArrow, slideIndex } = this.state;

    return (
      <div ref={ el => this.el = el } style={ { ...wrapperStyle, ...style.wrapper } }>
        <Swiper
          spaceBetween={ spaceBetween }
          beforeOffsetAtMiddle={ 40 }
          onSnapIndexChange={ this.updateArrowsAndSlideIndex.bind(this) }
          onUpdate={ this.updateArrows.bind(this) }
          slideIndex={ slideIndex }>
          { children }
        </Swiper>
        <Arrow
          style={ style.navigationButton }
          direction='right'
          show={ displayRightArrow }
          onClick={ this.handleNavigate.bind(this) }/>
        <Arrow
          style={ style.navigationButton }
          direction='left'
          show={ displayLeftArrow }
          onClick={ this.handleNavigate.bind(this) }/>
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
  spaceBetween: PropTypes.number
};

Carousel.defaultProps = {
  threshold: 10,
  spaceBetween: 8,
  style: {},
  loadMore: () => {},
  onNavigate: () => {}
};
