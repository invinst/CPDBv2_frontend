import React, { PropTypes, Component } from 'react';

import Carousel from 'components/common/carousel';
import ComplaintCard, { itemWidth } from './complaint-card';

import { wrapperStyle, headerStyle, countStyle, titleStyle, carouselStyle } from './carousel-wrapper.style';


export default class CarouselWrapper extends Component {
  componentDidMount() {
    const { crid, selectedDistance, match, fetchRelatedComplaints } = this.props;

    fetchRelatedComplaints(crid, match, selectedDistance);
  }

  componentWillReceiveProps(nextProps) {
    const { crid, selectedDistance, match, fetchRelatedComplaints } = this.props;

    if (nextProps.selectedDistance != selectedDistance) {
      fetchRelatedComplaints(crid, match, nextProps.selectedDistance);
    }
  }

  render() {
    const { count, cards, title } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          <span style={ countStyle }>{ count } </span>
          <span style={ titleStyle }>{ title }</span>
        </div>
        <Carousel
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
  title: PropTypes.string,
  crid: PropTypes.string,
  selectedDistance: PropTypes.string,
  match: PropTypes.string,
  fetchRelatedComplaints: PropTypes.func
};
