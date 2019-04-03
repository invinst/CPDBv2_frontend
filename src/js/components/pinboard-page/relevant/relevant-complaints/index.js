import React, { Component, PropTypes } from 'react';

import RelevantComplaintCard from './relevant-complaint-card';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';


export default class RelevantComplaints extends Component {
  loadMore() {
    const { pinboardId, nextParams, fetchPinboardRelevantComplaints } = this.props;
    fetchPinboardRelevantComplaints(pinboardId, nextParams);
  }

  render() {
    const { complaints, hasMore, addItemToPinboard } = this.props;
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
              <RelevantComplaintCard { ...complaint } addItemToPinboard={ addItemToPinboard }/>
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
  addItemToPinboard: PropTypes.func,
};

RelevantComplaints.defaultProps = {
  complaints: []
};
