import React, { Component, PropTypes } from 'react';

import RelevantCoaccusalCard from './relevant-coaccusal-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/relevant-infinite-carousel';


export default class RelevantCoaccusals extends Component {
  loadMore() {
    const { pinboardId, nextParams, fetchPinboardRelevantCoaccusals } = this.props;
    fetchPinboardRelevantCoaccusals(pinboardId, nextParams);
  }

  render() {
    const { coaccusals, hasMore } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='COACCUSALS'
        childWidth={ 148 }
        hasMore={ hasMore }
        loadMore={ this.loadMore.bind(this) }
      >
        {
          coaccusals.map(coaccusal =>
            <div key={ coaccusal.id } style={ { width: '148px' } }>
              <RelevantCoaccusalCard { ...coaccusal }/>
            </div>
          )
        }
      </RelevantInfiniteCarousel>
    );
  }
}

RelevantCoaccusals.propTypes = {
  coaccusals: PropTypes.arrayOf(PropTypes.object),
  fetchPinboardRelevantCoaccusals: PropTypes.func,
  hasMore: PropTypes.bool,
  pinboardId: PropTypes.string,
};

RelevantCoaccusals.defaultProps = {
  coaccusals: []
};
