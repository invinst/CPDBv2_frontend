import React, { PropTypes, Component } from 'react';

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
      this.setState({
        slideIndex: slideIndex + this.slidesPerGroup
      });
    } else {
      this.setState({
        slideIndex: slideIndex - this.slidesPerGroup
      });
    }
    onNavigate(direction);
  }

  handleSnapIndexChange({ isEnd, isBeginning }) {
    this.setState({
      displayLeftArrow: !isBeginning,
      displayRightArrow: !isEnd
    });
  }

  render() {
    const { children, style, spaceBetween } = this.props;
    const { displayLeftArrow, displayRightArrow, slideIndex } = this.state;

    return (
      <div ref={ el => this.el = el } style={ { ...wrapperStyle, ...style } }>
        <Swiper
          spaceBetween={ spaceBetween }
          beforeOffsetAtMiddle={ 40 }
          onSnapIndexChange={ this.handleSnapIndexChange.bind(this) }
          slideIndex={ slideIndex }>
          { children }
        </Swiper>
        <Arrow
          direction='right'
          show={ displayRightArrow }
          onClick={ this.handleNavigate.bind(this) }/>
        <Arrow
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
  spaceBetween: PropTypes.number
};

Carousel.defaultProps = {
  spaceBetween: 8,
  onNavigate: () => {}
};
