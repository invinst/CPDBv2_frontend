import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import SwiperJs from 'swiper';


/* istanbul ignore next */
export default class Swiper extends Component {
  componentDidMount() {
    const {
      spaceBetween,
      beforeOffsetAtMiddle,
      onSnapIndexChange,
      onUpdate,
      slideNextTransitionStart,
      slidePrevTransitionStart
    } = this.props;
    this.swiper = new SwiperJs(this.el, {
      slidesPerView: 'auto',
      direction: 'horizontal',
      spaceBetween,
      on: {
        snapIndexChange: () => {
          if (!this.swiper) return;
          const { activeIndex, isEnd, isBeginning } = this.swiper;
          onSnapIndexChange({
            activeIndex,
            isEnd,
            isBeginning
          });
        },
        update: () => {
          if (!this.swiper) return;
          const { isBeginning, isEnd } = this.swiper;
          onUpdate({
            isEnd,
            isBeginning
          });
        },
        transitionStart: () => {
          if (!this.swiper) return;
          if (!this.swiper.isBeginning && !this.swiper.isEnd) {
            this.swiper.setTranslate(this.swiper.translate + beforeOffsetAtMiddle);
          }
        },
        slideNextTransitionStart: slideNextTransitionStart,
        slidePrevTransitionStart: slidePrevTransitionStart,
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    const { children, slideIndex } = this.props;
    return (children !== nextProps.children) ||
      (slideIndex !== nextProps.slideIndex);
  }

  componentDidUpdate() {
    const { slideIndex, children } = this.props;
    if (this.swiper.slides.length !== children.length) {
      this.swiper.update();
    }
    this.swiper.slideTo(slideIndex);
  }

  componentWillUnmount() {
    if (typeof this.swiper !== 'undefined') {
      this.swiper.destroy(true, true);
    }
    delete this.swiper;
  }

  renderSlideItems(child) {
    if (!child) return null;

    const childProps = {
      ...child.props,
      className: classnames('swiper-slide', child.props.className)
    };

    return React.cloneElement(child, childProps);
  }

  render() {
    const { children } = this.props;

    return (
      <div ref={ el => this.el = el }>
        <div className='swiper-wrapper'>
          { React.Children.map(children, this.renderSlideItems.bind(this)) }
        </div>
      </div>
    );
  }
}

Swiper.propTypes = {
  spaceBetween: PropTypes.number,
  beforeOffsetAtMiddle: PropTypes.number,
  onSnapIndexChange: PropTypes.func,
  slideNextTransitionStart: PropTypes.func,
  slidePrevTransitionStart: PropTypes.func,
  children: PropTypes.node,
  onUpdate: PropTypes.func,
  slideIndex: PropTypes.number
};

Swiper.defaultProps = {
  onUpdate: () => {},
  onSnapIndexChange: () => {},
  slideNextTransitionStart: () => {},
  slidePrevTransitionStart: () => {}
};
