import React, { PropTypes, Component } from 'react';
import { isEqual } from 'lodash';

import Arrow, { arrowWidth } from './arrow';
import Swiper from 'components/common/swiper';
import styles from './carousel.sass';


export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      displayRightArrow: true,
      displayLeftArrow: false,
    };
  }

  componentDidMount() {
    this.updateSlidesPerGroup();
  }

  componentWillReceiveProps(nextProps) {
    const { children, resetPosition } = this.props;
    if (
      children.length > nextProps.children.length ||
      !isEqual(children, nextProps.children.slice(0, children.length))
    ) {
      resetPosition && this.slideTo(0);
    }
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

  handleNavigate = direction => {
    const { slideIndex } = this.state;
    if (direction === 'right') {
      this.slideTo(slideIndex + this.slidesPerGroup);
    } else {
      this.slideTo(slideIndex - this.slidesPerGroup);
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
