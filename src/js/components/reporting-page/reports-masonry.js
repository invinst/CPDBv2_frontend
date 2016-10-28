import React, { Component, PropTypes } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';

import ReportGroup from './report-group';
import { masonrySizes } from './group-types';
import ReportAddButton from './report-add-button';
import { wrapperStyle, borderSleeveStyle } from './reports-masonry.style';


export default class ReportsMasonry extends Component {
  componentDidMount() {
    this.props.loadMore();
  }

  render() {
    const {
      hasMore, loadMore, reportGroups, onReportClick, nextParams, onAddReportClick
    } = this.props;
    const { editModeOn } = this.context;

    let addButtonArray = [];
    if (editModeOn) {
      addButtonArray = [<ReportAddButton key='add' onClick={ onAddReportClick }/>];
    }

    return (
      <div>
        <div style={ borderSleeveStyle }/>
        <div style={ wrapperStyle }>
          <MasonryInfiniteScroller
            hasMore={ hasMore }
            loadMore={ loadMore.bind(null, nextParams) }
            sizes={ masonrySizes }>
            {
              addButtonArray.concat(
                reportGroups.map(group => (
                  <ReportGroup
                    key={ group.key }
                    onReportClick={ onReportClick }
                    { ...group }/>
                ))
              )
            }
          </MasonryInfiniteScroller>
        </div>
      </div>
    );
  }
}

ReportsMasonry.propTypes = {
  hasMore: PropTypes.bool,
  loadMore: PropTypes.func,
  reportGroups: PropTypes.array,
  onReportClick: PropTypes.func,
  onAddReportClick: PropTypes.func,
  nextParams: PropTypes.object
};

ReportsMasonry.contextTypes = {
  editModeOn: PropTypes.bool
};
