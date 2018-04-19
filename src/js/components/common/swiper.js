import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import SwiperJs from 'swiper';


/* istanbul ignore next */
export default class Swiper extends Component {
  componentDidMount() {
    const { spaceBetween, beforeOffsetAtMiddle, onSnapIndexChange } = this.props;
    this.swiper = new SwiperJs(this.el, {
      slidesPerView: 'auto',
      direction: 'horizontal',
      spaceBetween,
      on: {
        snapIndexChange: () => {
          if (!this.swiper) return;
          onSnapIndexChange({
            isEnd: this.swiper.isEnd,
            isBeginning: this.swiper.isBeginning
          });
        },
        slideChangeTransitionStart: () => {
          if (!this.swiper.isBeginning && !this.swiper.isEnd) {
            this.swiper.setTranslate(this.swiper.translate + beforeOffsetAtMiddle);
          }
        }
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
  children: PropTypes.node,
  slideIndex: PropTypes.number
};
