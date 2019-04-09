import React, { Component, PropTypes } from 'react';

import RelevantCoaccusalCard from './relevant-coaccusal-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';


export default class RelevantCoaccusals extends Component {
  loadMore() {
    const { pinboardId, nextParams, fetchPinboardRelevantCoaccusals } = this.props;
    fetchPinboardRelevantCoaccusals(pinboardId, nextParams);
  }

  render() {
    const { coaccusals, hasMore, addItemToPinboard } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='COACCUSALS'
        childWidth={ 148 }
        hasMore={ hasMore }
        loadMore={ this.loadMore.bind(this) }
      >
        {
          coaccusals.map(coaccusal =>
            <div className='test--coaccusal-card-wrapper' key={ coaccusal.id } style={ { width: '148px' } }>
              <RelevantCoaccusalCard { ...coaccusal } addItemToPinboard={ addItemToPinboard }/>
            </div>
          )
        }
      </RelevantInfiniteCarousel>
    );
  }
}

RelevantCoaccusals.propTypes = {
  coaccusals: PropTypes.arrayOf(PropTypes.object),
  nextParams: PropTypes.object,
  fetchPinboardRelevantCoaccusals: PropTypes.func,
  addItemToPinboard: PropTypes.func,
  hasMore: PropTypes.bool,
  pinboardId: PropTypes.string,
};

RelevantCoaccusals.defaultProps = {
  coaccusals: []
};
