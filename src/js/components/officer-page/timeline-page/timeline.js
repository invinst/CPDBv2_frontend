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
    const { loadMore, sortParams } = this.props;
    loadMore(sortParams);
  }

  componentWillReceiveProps(nextProps) {
    const { sortParams, loadMore, selectedItemIndex, loadMoreIfNecessary, items } = this.props;
    if (nextProps.sortParams !== sortParams) {
      loadMore(nextProps.sortParams);
    }

    if (nextProps.selectedItemIndex !== selectedItemIndex) {
      loadMoreIfNecessary(size(items), nextProps.selectedItemIndex, sortParams);
      setTimeout(() => this.setState({ flashItemIndex: nextProps.selectedItemIndex }), 500);
    }
  }

  handleItemSelected(itemTop) {
    this.setState({ selectedItemTop: itemTop });
  }

  render() {
    const { items, loadMore, nextParams, hasMore, sortParams, selectedItemIndex } = this.props;
    const { selectedItemTop, flashItemIndex } = this.state;
    return (
      <SmoothScroller style={ wrapperStyle } selectedItemTop={ selectedItemTop }>
        <InfiniteScroll
          loadMore={ () => hasMore ? loadMore({ ...sortParams, ...nextParams }) : null }
          hasMore={ hasMore }
          useWindow={ false }>
          { map(items, (item, ind) => (
            <TimelineItem item={ item } key={ ind } selected={ ind === selectedItemIndex }
              onSelected={ this.handleItemSelected } flash={ ind === flashItemIndex }/>
          )) }
        </InfiniteScroll>
      </SmoothScroller>
    );
  }
}

Timeline.propTypes = {
  items: PropTypes.array,
  loadMore: PropTypes.func,
  nextParams: PropTypes.object,
  sortParams: PropTypes.object,
  hasMore: PropTypes.bool,
  selectedItemIndex: PropTypes.number,
  loadMoreIfNecessary: PropTypes.func
};
