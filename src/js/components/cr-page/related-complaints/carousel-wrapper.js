import React, { PropTypes, Component } from 'react';

import Carousel from 'components/common/carousel';
import ComplaintCard, { itemWidth } from './complaint-card';

import { wrapperStyle, headerStyle, countStyle, titleStyle, carouselStyle } from './carousel-wrapper.style';


export default class CarouselWrapper extends Component {
  componentDidMount() {
    const { crid, distance, match, fetchRelatedComplaints } = this.props;

    fetchRelatedComplaints(crid, { match, distance });
  }

  componentWillReceiveProps(nextProps) {
    const { crid, distance, match, fetchRelatedComplaints } = this.props;

    if (nextProps.distance != distance) {
      fetchRelatedComplaints(crid, { match, distance: nextProps.distance });
    }
  }

  loadMore() {
    const { crid, nextParams, fetchRelatedComplaints } = this.props;
    fetchRelatedComplaints(crid, nextParams);
  }

  render() {
    const { count, cards, title, hasMore } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          <span style={ countStyle }>{ count } </span>
          <span style={ titleStyle }>{ title }</span>
        </div>
        <Carousel
          loadMore={ this.loadMore.bind(this) }
          hasMore={ hasMore }
          style={ carouselStyle }
          childWidth={ itemWidth }
        >
          {
            cards.map(card => (
              <ComplaintCard key={ card.crid } { ...card } />
            ))
          }
        </Carousel>
      </div>
    );
  }
}

CarouselWrapper.propTypes = {
  cards: PropTypes.array,
  count: PropTypes.number,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  title: PropTypes.string,
  crid: PropTypes.string,
  distance: PropTypes.string,
  match: PropTypes.string,
  fetchRelatedComplaints: PropTypes.func
};
