import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import Carousel from 'components/common/carousel';
import styles from './relevant-infinite-carousel.sass';
import LoadingSpinner from 'components/common/loading-spinner';


export default class RelevantInfiniteCarousel extends Component {
  render() {
    const { children, childWidth, title, hasMore, loadMore, className, requesting } = this.props;

    if (!requesting && (!children || children.length < 1))
      return null;

    return (
      <div className={ cx(className, styles.relevantInfiniteCarousel) }>
        <div className='relevant-infinite-carousel-title'>{ title }</div>
        { requesting ? (
          <LoadingSpinner className='relevant-carousel-loading' fill='white' />
        ) : (
          <Carousel
            childWidth={ childWidth }
            hasMore={ hasMore }
            loadMore={ loadMore }
            arrowClassName='relevant-carousel-arrow'
          >
            { children }
          </Carousel>
        ) }
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
  requesting: PropTypes.bool,
};
