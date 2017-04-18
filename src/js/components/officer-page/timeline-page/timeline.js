import React, { PropTypes, Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { map } from 'lodash';

import { wrapperStyle } from './timeline.style';
import TimelineItem from './timeline-item';


export default class Timeline extends Component {
  componentDidMount() {
    const { loadMore } = this.props;
    loadMore();
  }

  render() {
    const { items, loadMore, nextParams, hasMore } = this.props;
    return (
      <div style={ wrapperStyle }>
        <InfiniteScroll
          loadMore={ () => loadMore(nextParams) }
          hasMore={ hasMore }>
          { map(items, (item, ind) => (
            <TimelineItem item={ item } key={ ind }/>
          )) }
        </InfiniteScroll>
      </div>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  loadMore: PropTypes.func,
  nextParams: PropTypes.object,
  hasMore: PropTypes.bool,
  fetchTimelineItems: PropTypes.func
};
