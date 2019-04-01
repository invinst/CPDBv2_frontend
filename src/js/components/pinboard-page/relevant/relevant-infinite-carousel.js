import React, { Component, PropTypes } from 'react';

import Carousel from 'components/common/carousel';
import styles from './relevant-infinite-carousel.sass';


export default class RelevantInfiniteCarousel extends Component {
  render() {
    const { children, childWidth, title } = this.props;

    return (
      <div className={ styles.relevantInfiniteCarousel }>
        <div className='relevant-infinite-carousel-title'>{ title }</div>
        <Carousel childWidth={ childWidth }>
          { children }
        </Carousel>
      </div>
    );
  }
}

RelevantInfiniteCarousel.propTypes = {
  children: PropTypes.node,
  childWidth: PropTypes.number,
  title: PropTypes.string,
};
