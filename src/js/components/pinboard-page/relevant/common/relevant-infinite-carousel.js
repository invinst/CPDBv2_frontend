import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import Carousel from 'components/common/carousel';
import styles from './relevant-infinite-carousel.sass';


export default class RelevantInfiniteCarousel extends Component {
  render() {
    const { children, childWidth, title, hasMore, loadMore, className } = this.props;

    return (
      <div className={ cx(className, styles.relevantInfiniteCarousel) }>
        <div className='relevant-infinite-carousel-title'>{ title }</div>
        <Carousel
          childWidth={ childWidth }
          hasMore={ hasMore }
          loadMore={ loadMore }
          arrowClassName='relevant-carousel-arrow'
        >
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
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  className: PropTypes.string,
};
