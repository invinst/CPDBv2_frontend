import React, { PropTypes, Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { map, size } from 'lodash';

import TimelineItem from './timeline-item';
import SmoothScroller from './smooth-scroller';
import { wrapperStyle } from './timeline.style';


export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemTop: 0,
      flashItemIndex: 0
    };
    this.handleItemSelected = this.handleItemSelected.bind(this);
  }

  componentDidMount() {
    const { fetchTimelineItems, sortParams, officerId } = this.props;
    fetchTimelineItems(officerId, sortParams);
  }

  componentWillReceiveProps(nextProps) {
    const {
      sortParams, fetchTimelineItems, selectedItemIndex,
      fetchTimelineItemsWhenIndexOutOfBound, items, officerId
    } = this.props;
    if (nextProps.sortParams !== sortParams) {
      fetchTimelineItems(officerId, nextProps.sortParams);
    }

    if (nextProps.selectedItemIndex !== selectedItemIndex) {
      fetchTimelineItemsWhenIndexOutOfBound(size(items), nextProps.selectedItemIndex, officerId, sortParams);
      setTimeout(() => this.setState({ flashItemIndex: nextProps.selectedItemIndex }), 500);
    }
  }

  handleItemSelected(itemTop) {
    this.setState({ selectedItemTop: itemTop });
  }

  render() {
    const {
      items, fetchTimelineItems, nextParams, hasMore, sortParams,
      selectedItemIndex, hoveredItemIndex, openBottomSheetWithComplaint, officerId
    } = this.props;
    const { selectedItemTop, flashItemIndex } = this.state;
    return (
      <SmoothScroller style={ wrapperStyle } selectedItemTop={ selectedItemTop }>
        <InfiniteScroll
          loadMore={ () => hasMore ? fetchTimelineItems(officerId, { ...sortParams, ...nextParams }) : null }
          hasMore={ hasMore }
          useWindow={ false }>
          { map(items, (item, ind) => (
            <TimelineItem item={ item } key={ ind } selected={ ind === selectedItemIndex }
              minimapItemHovered={ ind === hoveredItemIndex } officerId={ officerId }
              onSelected={ this.handleItemSelected } flash={ ind === flashItemIndex }
              openBottomSheetWithComplaint={ openBottomSheetWithComplaint }/>
          )) }
        </InfiniteScroll>
      </SmoothScroller>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  fetchTimelineItems: PropTypes.func,
  nextParams: PropTypes.object,
  sortParams: PropTypes.object,
  hasMore: PropTypes.bool,
  selectedItemIndex: PropTypes.number,
  hoveredItemIndex: PropTypes.number,
  officerId: PropTypes.number,
  fetchTimelineItemsWhenIndexOutOfBound: PropTypes.func,
  openBottomSheetWithComplaint: PropTypes.func
};

Timeline.defaultProps = {
  fetchTimelineItems: () => {}
};
