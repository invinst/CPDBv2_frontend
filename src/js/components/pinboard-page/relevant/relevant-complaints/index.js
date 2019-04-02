import React, { Component, PropTypes } from 'react';

import RelevantComplaintCard from './relevant-complaint-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/relevant-infinite-carousel';


export default class RelevantComplaints extends Component {
  loadMore() {
    const { pinboardId, nextParams, fetchPinboardRelevantComplaints } = this.props;
    fetchPinboardRelevantComplaints(pinboardId, nextParams);
  }

  render() {
    const { complaints, hasMore } = this.props;
    return (
      <RelevantInfiniteCarousel
        title='COMPLAINTS'
        childWidth={ 306 }
        hasMore={ hasMore }
        loadMore={ this.loadMore.bind(this) }
      >
        {
          complaints.map((complaint, index) =>
            <div key={ index } style={ { width: '306px' } }>
              <RelevantComplaintCard { ...complaint }/>
            </div>
          )
        }
      </RelevantInfiniteCarousel>
    );
  }
}

RelevantComplaints.propTypes = {
  complaints: PropTypes.arrayOf(PropTypes.object),
  fetchPinboardRelevantComplaints: PropTypes.func,
  hasMore: PropTypes.bool,
  pinboardId: PropTypes.string,
};

RelevantComplaints.defaultProps = {
  complaints: []
};
