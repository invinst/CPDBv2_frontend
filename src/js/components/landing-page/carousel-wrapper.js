import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';

import Carousel from 'components/common/carousel';
import InlineEditHeader from 'components/common/carousel/inline-header-section';


export default function withCarousel(CardComponent, type = '', extraCardAttr = {}) {
  class Wrapper extends Component {
    componentDidMount() {
      const { queryData } = this.props;
      queryData && queryData();
    }

    render() {
      const { cards, editWrapperStateProps } = this.props;
      const slideWidth = 232;

      const slideElements = cards.map((card, index) => {
        return (
          <div key={ index } style={ { width: `${slideWidth}px` } } className='test--carousel--item'>
            <CardComponent { ...omit(card, 'id') } { ...extraCardAttr } />
          </div>
        );
      });

      return (
        <div className={ `test--landing--carousel-${(type.key || type).toLowerCase()}` }>
          <Carousel
            headerSection={
              <InlineEditHeader editWrapperStateProps={ editWrapperStateProps } type={ type }/>
            }
          >
            { slideElements }
          </Carousel>
        </div>
      );
    }
  }

  Wrapper.propTypes = {
    queryData: PropTypes.func,
    cards: PropTypes.array,
    editWrapperStateProps: PropTypes.object
  };

  return Wrapper;
}


